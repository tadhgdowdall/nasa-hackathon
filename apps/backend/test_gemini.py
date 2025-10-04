"""
Test script to list available Gemini models and test basic functionality
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure API
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("ERROR: GEMINI_API_KEY not found in environment")
    exit(1)

genai.configure(api_key=api_key)

print("=== Available Gemini Models ===")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"✓ {model.name}")
        print(f"  Display Name: {model.display_name}")
        print(f"  Description: {model.description}")
        print()

print("\n=== Testing Model ===")
try:
    # Try to use a model
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say 'Hello World' in 5 words or less.")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
    print("\nTrying alternative model name...")
    try:
        model = genai.GenerativeModel('models/gemini-1.5-flash')
        response = model.generate_content("Say 'Hello World' in 5 words or less.")
        print(f"Success! Response: {response.text}")
    except Exception as e2:
        print(f"Error: {e2}")
