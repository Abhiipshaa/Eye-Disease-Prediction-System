# Chatbot.py  —  Gemini-powered eye disease assistant
# Uses the new google.genai SDK (google-generativeai is deprecated)

from google import genai

# Initialise the client once at import time.
# The API key is hardcoded here for the hackathon prototype.
# In production, load it from an environment variable instead.
client = genai.Client(api_key="AIzaSyBPd_d68QEctEsAFeuvcK2Bziqs9rrXNKI")

# Model to use — gemini-2.0-flash is the current recommended fast model
MODEL = "gemini-2.0-flash"

SYSTEM_PROMPT = """You are an AI assistant for an Eye Disease Detection system.
Your task is to interact with users who either describe symptoms or have retinal reports.
Follow these instructions strictly:

1. Symptom Analysis:
   - If the user describes symptoms, identify whether they might indicate:
     Diabetic Retinopathy, Cataract, Glaucoma, Normal eyes, or unknown condition.
   - Clearly tell the user which condition the symptoms suggest.
   - Advise the user to upload a retinal scan for AI prediction.

2. Report Summarization:
   - If the user pastes a report, summarize it in simple terms.
   - Highlight detected conditions, risk levels, and confidence scores.
   - Give actionable advice in plain language.

3. Guidelines:
   - Keep answers short, precise, and easy to understand.
   - Always recommend consulting a qualified doctor for confirmation.
   - Encourage users to use the Eye Disease Detection tool if appropriate."""


def get_chatbot_response(user_message: str) -> str:
    """
    Send user_message to Gemini and return the text response.
    Falls back to a safe error string if the API call fails.
    """
    prompt = f"{SYSTEM_PROMPT}\n\nUser: {user_message}"
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
        )
        return response.text
    except Exception:
        return "Sorry, I couldn't process your request right now."
