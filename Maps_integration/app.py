from flask import Flask, request, jsonify
from services.clinic_finder import find_nearest_clinics
from flask import render_template

app = Flask(__name__)

clinics = [
    {"name": "Clinic A1", "lat": 19.0760, "lon": 72.8777},
    {"name": "Clinic B1", "lat": 19.0820, "lon": 72.8850},
    {"name": "Clinic C1", "lat": 19.0900, "lon": 72.8600},
    {"name": "Clinic D1", "lat": 19.0700, "lon": 72.9000},
    {"name": "Clinic E1", "lat": 20.3445, "lon": 85.8155},
    {"name": "Clinic F1", "lat": 20.3540, "lon": 85.8190},
    {"name": "Clinic G1", "lat": 20.2961, "lon": 85.8245},
    {"name": "Clinic H1", "lat": 20.2965, "lon": 85.8060},
    {"name": "Clinic I1", "lat": 20.2645, "lon": 85.8432},
    {"name": "Clinic A", "lat": 20.3425, "lon": 85.8228},
    {"name": "Clinic B", "lat": 20.3440, "lon": 85.8200},
    {"name": "Clinic C", "lat": 20.3400, "lon": 85.8250},

    # Delhi
    {"name": "Clinic D", "lat": 28.6139, "lon": 77.2090},
    {"name": "Clinic E", "lat": 28.5355, "lon": 77.3910},
    {"name": "Clinic F", "lat": 28.7041, "lon": 77.1025},

    # Mumbai
    {"name": "Clinic G", "lat": 19.0760, "lon": 72.8777},
    {"name": "Clinic H", "lat": 19.2183, "lon": 72.9781},
    {"name": "Clinic I", "lat": 19.0330, "lon": 72.8570},

    # Bangalore
    {"name": "Clinic J", "lat": 12.9716, "lon": 77.5946},
    {"name": "Clinic K", "lat": 12.9352, "lon": 77.6245},
    {"name": "Clinic L", "lat": 13.0350, "lon": 77.5970},

    # Chennai
    {"name": "Clinic M", "lat": 13.0827, "lon": 80.2707},
    {"name": "Clinic N", "lat": 13.0674, "lon": 80.2376},
    {"name": "Clinic O", "lat": 13.1000, "lon": 80.2500},

    # Kolkata
    {"name": "Clinic P", "lat": 22.5726, "lon": 88.3639},
    {"name": "Clinic Q", "lat": 22.5448, "lon": 88.3426},
    {"name": "Clinic R", "lat": 22.5958, "lon": 88.2636},

    # Hyderabad
    {"name": "Clinic S", "lat": 17.3850, "lon": 78.4867},
    {"name": "Clinic T", "lat": 17.4474, "lon": 78.3762},
    {"name": "Clinic U", "lat": 17.3616, "lon": 78.4747},

    # Ahmedabad
    {"name": "Clinic V", "lat": 23.0225, "lon": 72.5714},
    {"name": "Clinic W", "lat": 23.0395, "lon": 72.5660},

    # Pune
    {"name": "Clinic X", "lat": 18.5204, "lon": 73.8567},
    {"name": "Clinic Y", "lat": 18.5314, "lon": 73.8446},

    # Jaipur
    {"name": "Clinic Z", "lat": 26.9124, "lon": 75.7873},

    # Lucknow
    {"name": "Clinic AA", "lat": 26.8467, "lon": 80.9462},

    # Chandigarh
    {"name": "Clinic AB", "lat": 30.7333, "lon": 76.7794},

    # Kochi
    {"name": "Clinic AC", "lat": 9.9312, "lon": 76.2673},

    # Guwahati
    {"name": "Clinic AD", "lat": 26.1445, "lon": 91.7362}
]

@app.route("/all_clinics")
def all_clinics():
    return jsonify(clinics)

@app.route("/")
def home():
    return render_template("map.html")

@app.route("/find_clinics", methods=["GET"])
def find_clinics():
    user_lat = request.args.get("lat", type=float)
    user_lon = request.args.get("lon", type=float)

    if user_lat is None or user_lon is None:
        return jsonify({"error": "Missing lat/lon"}), 400

    result = find_nearest_clinics(user_lat, user_lon, clinics)

    return jsonify(result)

if __name__ == "__main__":
    print("Server started")
    app.run(debug=True)
