# EyeScreen AI — Eye Disease Detection

AI-powered retinal screening system built by **Team Blur Busters**.

## Project Structure

```
AI- Powered Eye Disease Detection/
├── Frontend/        # React + Vite + Tailwind CSS
├── Backend/         # Python Flask REST API
└── start.bat        # One-click startup script
```

## Quick Start

### Option 1 — One click
Double-click `start.bat` — opens both servers automatically.

### Option 2 — Manual

**Backend**
```bash
cd Backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

**Frontend**
```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, conditions detected |
| Upload | `/upload` | Drag-and-drop retinal image upload |
| Report | `/report` | Disease, confidence score, recommendations |

## API

### `POST /predict`
Upload a retinal image for analysis.

**Request:** `multipart/form-data` with field `image`

**Response:**
```json
{
  "disease": "Diabetic Retinopathy",
  "severity": "high",
  "confidence": 91,
  "recommendations": ["...", "..."]
}
```

### `GET /health`
Returns `{ "status": "ok" }` — use to check if backend is running.

## Plugging in Your Real Model

In `Backend/app.py`, replace the mock block with your model:

```python
# from model import predict_disease
# result = predict_disease(image_file)
result = random.choice(CONDITIONS)   # ← replace this line
```
