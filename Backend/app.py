# app.py
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Force TensorFlow to use CPU

from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
import datetime
import numpy as np
import random
import string
from pymongo import MongoClient
from dotenv import load_dotenv
from Chatbot import get_chatbot_response

# TensorFlow/Keras imports
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

# Optional: limit CPU threads for low-end machines
tf.config.threading.set_intra_op_parallelism_threads(2)
tf.config.threading.set_inter_op_parallelism_threads(2)

# ── Load environment variables
load_dotenv()

# ── MongoDB Setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["eyeDisease-patient-DB"]
patients_col = db["patients"]
clinics_col = db["clinics"]
reports_col = db["reports"]

# ── JWT Setup
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret")
def make_token(payload):
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# ── Load ML Model
model_path = os.path.join(os.path.dirname(__file__), "models", "eye_detection_model.h5")
model = load_model(model_path)

# ── Disease metadata keyed by model label
DISEASE_INFO = {
    "cataract": {
        "display": "Cataract", "severity": "medium",
        "recommendations": [
            "Refer to ophthalmologist for slit-lamp examination.",
            "Discuss surgical options (phacoemulsification) if vision is impaired.",
            "Advise UV-protective eyewear.",
            "Monitor progression with follow-up in 3 months.",
            "Assess impact on daily activities and driving."
        ]
    },
    "diabetic_retinopathy": {
        "display": "Diabetic Retinopathy", "severity": "high",
        "recommendations": [
            "Refer to ophthalmologist within 48 hours.",
            "Advise strict blood glucose control (target HbA1c < 7%).",
            "Schedule follow-up retinal imaging in 3 months.",
            "Educate patient on diabetes management and eye care.",
            "Consider laser photocoagulation if proliferative stage confirmed."
        ]
    },
    "glaucoma": {
        "display": "Glaucoma (Suspected)", "severity": "medium",
        "recommendations": [
            "Refer for intraocular pressure (IOP) measurement.",
            "Schedule visual field testing within 2 weeks.",
            "Monitor optic nerve head for progressive cupping.",
            "Advise patient to avoid activities that raise IOP.",
            "Follow up with specialist within 2 weeks."
        ]
    },
    "normal": {
        "display": "No Significant Abnormality", "severity": "low",
        "recommendations": [
            "No immediate clinical action required.",
            "Routine eye examination recommended annually.",
            "Advise patient to report any sudden vision changes.",
            "Maintain healthy lifestyle to reduce future risk.",
            "Next screening in 12 months."
        ]
    },
}
class_labels = list(DISEASE_INFO.keys())

# ── Prediction function
def predict_eye_disease(image_path):
    img = image.load_img(image_path, target_size=(300, 300))
    img_array = preprocess_input(np.expand_dims(image.img_to_array(img), axis=0))

    predictions = model.predict(img_array)[0]  # CPU-friendly
    predicted_index = int(np.argmax(predictions))
    predicted_label = class_labels[predicted_index]
    confidence = float(predictions[predicted_index])

    top_2 = predictions.argsort()[-2:][::-1]
    info = DISEASE_INFO[predicted_label]

    return {
        "disease": info["display"],
        "severity": info["severity"],
        "confidence": round(confidence * 100, 2),
        "low_confidence": confidence < 0.6,
        "recommendations": info["recommendations"],
        "top_predictions": [
            {"label": DISEASE_INFO[class_labels[i]]["display"], "confidence": round(float(predictions[i] * 100), 2)}
            for i in top_2
        ]
    }

# ── Flask App Setup
app = Flask(__name__)
CORS(app)

# ── Auth Routes
@app.route("/register/patient", methods=["POST"])
def register_patient():
    d = request.get_json()
    name = d.get("name", "").strip()
    email = d.get("email", "").strip().lower()
    password = d.get("password", "")
    if not name or not email or not password:
        return jsonify({"error": "name, email, and password are required"}), 400
    if patients_col.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    ref_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    while patients_col.find_one({"ref_id": ref_id}):
        ref_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    patients_col.insert_one({"name": name, "email": email, "password": hashed, "role": "patient", "ref_id": ref_id, "family": []})
    token = make_token({"email": email, "name": name, "role": "patient"})
    return jsonify({"message": "Patient registered", "token": token, "name": name, "email": email, "role": "patient", "ref_id": ref_id}), 201

@app.route("/register/clinic", methods=["POST"])
def register_clinic():
    d = request.get_json()
    name = d.get("name", "").strip()
    email = d.get("email", "").strip().lower()
    password = d.get("password", "")
    phone = d.get("phone", "").strip()
    address = d.get("address", "").strip()
    city = d.get("city", "").strip()
    state = d.get("state", "").strip()
    pincode = d.get("pincode", "").strip()
    lat = d.get("lat")
    lng = d.get("lng")
    if not name or not email or not password or not address or not city:
        return jsonify({"error": "name, email, password, address, and city are required"}), 400
    if clinics_col.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    doc = {
        "name": name, "email": email, "password": hashed, "role": "clinic",
        "phone": phone, "address": address, "city": city,
        "state": state, "pincode": pincode,
        "location": {"lat": lat, "lng": lng},
    }
    clinics_col.insert_one(doc)
    token = make_token({"email": email, "name": name, "role": "clinic"})
    return jsonify({"message": "Clinic registered", "token": token, "name": name, "email": email, "role": "clinic"}), 201

@app.route("/login/patient", methods=["POST"])
def login_patient():
    d = request.get_json()
    email = d.get("email", "").strip().lower()
    password = d.get("password", "")
    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = patients_col.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = make_token({"email": email, "name": user["name"], "role": "patient"})
    return jsonify({"message": "Login successful", "token": token, "name": user["name"], "email": email, "role": "patient", "ref_id": user.get("ref_id", "")}), 200

@app.route("/login/clinic", methods=["POST"])
def login_clinic():
    d = request.get_json()
    email = d.get("email", "").strip().lower()
    password = d.get("password", "")
    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    clinic = clinics_col.find_one({"email": email})
    if not clinic or not bcrypt.checkpw(password.encode(), clinic["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = make_token({"email": email, "name": clinic["name"], "role": "clinic"})
    return jsonify({"message": "Login successful", "token": token, "name": clinic["name"], "email": email, "role": "clinic"}), 200

# ── Chatbot Route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    reply = get_chatbot_response(data.get("message", ""))
    return jsonify({"reply": reply})

def decode_token(req):
    auth = req.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        try:
            return jwt.decode(auth[7:], JWT_SECRET, algorithms=["HS256"])
        except Exception:
            pass
    return None

# ── Predict Route
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided."}), 400
    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename."}), 400

    temp_path = f"temp_{file.filename}"
    file.save(temp_path)
    try:
        result = predict_eye_disease(temp_path)
    except Exception as e:
        os.remove(temp_path)
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    token_data = decode_token(request)
    report = {
        **result,
        "user_email": token_data["email"] if token_data else "",
        "timestamp": datetime.datetime.utcnow(),
        "patient": {
            "name": request.form.get("name", ""),
            "id": request.form.get("patientId", ""),
            "age": request.form.get("age", ""),
            "gender": request.form.get("gender", ""),
            "eye": request.form.get("eye", ""),
            "notes": request.form.get("notes", ""),
        }
    }
    reports_col.insert_one({k: v for k, v in report.items() if k != "_id"})
    os.remove(temp_path)
    return jsonify(result), 200

# ── History Route
@app.route("/reports/history", methods=["GET"])
def get_history():
    token_data = decode_token(request)
    if not token_data:
        return jsonify({"error": "Unauthorized"}), 401
    reports = list(reports_col.find({"user_email": token_data["email"]}, {"_id": 0}).sort("timestamp", -1))
    for r in reports:
        if "timestamp" in r and hasattr(r["timestamp"], "isoformat"):
            r["timestamp"] = r["timestamp"].isoformat()
    return jsonify(reports), 200

# ── Family Routes
@app.route("/family/connect", methods=["POST"])
def family_connect():
    token_data = decode_token(request)
    if not token_data:
        return jsonify({"error": "Unauthorized"}), 401
    ref_id = (request.get_json() or {}).get("ref_id", "").strip().upper()
    if not ref_id:
        return jsonify({"error": "ref_id is required"}), 400
    target = patients_col.find_one({"ref_id": ref_id})
    if not target:
        return jsonify({"error": "No user found with that Reference ID"}), 404
    if target["email"] == token_data["email"]:
        return jsonify({"error": "Cannot add yourself"}), 400
    me = patients_col.find_one({"email": token_data["email"]})
    if any(f["email"] == target["email"] for f in me.get("family", [])):
        return jsonify({"error": "Already connected"}), 409
    patients_col.update_one(
        {"email": token_data["email"]},
        {"$push": {"family": {"name": target["name"], "email": target["email"], "ref_id": ref_id}}}
    )
    return jsonify({"message": f"Connected with {target['name']}", "name": target["name"], "ref_id": ref_id}), 200

@app.route("/family/members", methods=["GET"])
def family_members():
    token_data = decode_token(request)
    if not token_data:
        return jsonify({"error": "Unauthorized"}), 401
    me = patients_col.find_one({"email": token_data["email"]})
    return jsonify(me.get("family", [])), 200

@app.route("/family/reports", methods=["GET"])
def family_reports():
    token_data = decode_token(request)
    if not token_data:
        return jsonify({"error": "Unauthorized"}), 401
    member_email = request.args.get("email", "")
    if not member_email:
        return jsonify({"error": "email query param required"}), 400
    me = patients_col.find_one({"email": token_data["email"]})
    if not any(f["email"] == member_email for f in me.get("family", [])):
        return jsonify({"error": "Not a connected family member"}), 403
    reports = list(reports_col.find({"user_email": member_email}, {"_id": 0}).sort("timestamp", -1))
    for r in reports:
        if "timestamp" in r and hasattr(r["timestamp"], "isoformat"):
            r["timestamp"] = r["timestamp"].isoformat()
    return jsonify(reports), 200

@app.route("/me", methods=["GET"])
def me():
    token_data = decode_token(request)
    if not token_data:
        return jsonify({"error": "Unauthorized"}), 401
    user = patients_col.find_one({"email": token_data["email"]}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user), 200

# ── Upload Report (Chatbot)
@app.route("/upload_report", methods=["POST"])
def upload_report():
    if "report" not in request.files:
        return jsonify({"error": "No file provided."}), 400
    file = request.files["report"]
    temp_path = f"temp_report_{file.filename}"
    file.save(temp_path)
    try:
        with open(temp_path, "r", errors="ignore") as f:
            content = f.read(2000)
        summary = get_chatbot_response(f"Summarize this medical report:\n{content}")
    except Exception as e:
        summary = f"Could not read report: {str(e)}"
    finally:
        os.remove(temp_path)
    return jsonify({"summary": summary})

# ── Health Check
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# ── Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)