import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

print("Testing gemini-2.5-flash model...")
model = genai.GenerativeModel('gemini-2.5-flash')
response = model.generate_content("Say 'Hello from Gemini!' in 5 words or less.")
print(f"✓ Success! Response: {response.text}")
