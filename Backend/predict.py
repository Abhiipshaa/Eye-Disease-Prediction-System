# predict.py
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

# Load model
model = load_model("eye_detection_model.h5")

# Class labels
class_labels = ['cataract', 'diabetic_retinopathy', 'glaucoma', 'normal']

# Load image
img_path = "test.jpg"
img = image.load_img(img_path, target_size=(300, 300))

# Preprocess
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = preprocess_input(img_array)

# Predict
predictions = model.predict(img_array)

# Interpret result
predicted_index = np.argmax(predictions)
predicted_label = class_labels[predicted_index]
confidence = np.max(predictions)

# Output
print("Prediction:", predicted_label)
# print("Confidence:", confidence)
print("Confidence:", round(confidence * 100, 2), "%")

if confidence < 0.6:
    print("\n⚠️ Low confidence prediction. Please consult a medical professional.")

else:
    top_2_indices = predictions[0].argsort()[-2:][::-1]

    print("\nTop Predictions:")
    for i in top_2_indices:
        print(f"{class_labels[i]}: {round(predictions[0][i]*100,2)}%")