# AI Chatbot Setup Instructions

## Quick Start

### 1. Get Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Sign up or log in with your Google account
3. Click "Create API key"
4. Copy the key

### 2. Add API Key to Backend Environment
Create or edit `apps/backend/.env`:
```bash
GEMINI_API_KEY=your-gemini-api-key-here
```

### 3. Install Backend Dependencies (if not already done)
```bash
cd apps/backend
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Restart Backend Server
```bash
cd apps/backend
source venv/bin/activate
python run.py
```

## Testing the Chatbot

### Example Questions:
- "What does microgravity do to bones?"
- "How does radiation affect plants in space?"
- "What are the effects of spaceflight on the immune system?"

### How It Works:
1. User asks a natural language question via the frontend
2. Frontend sends request to backend `/api/chat` endpoint
3. Backend searches NASA publications for relevant summaries
4. Backend uses Gemini API to analyze summaries and generate intelligent response
5. Response and results are sent back to frontend for display

## Cost Estimate

Using `gemini-1.5-flash` (Free Tier):
- **Free tier:** Up to 15 requests per minute
- **Rate limit:** 1,500 requests per day
- **Perfect for development and hackathons**
- **No cost for typical usage**

Note: Gemini offers a generous free tier, making it ideal for this project.

## Troubleshooting

### "GEMINI_API_KEY not configured" message:
- Make sure `.env` file exists in `apps/backend/` directory
- Verify you've added the correct API key from Google AI Studio
- Restart the Flask backend server

### No response from chatbot:
- Check browser console for errors (F12)
- Verify Flask backend is running on port 5001 (`python run.py`)
- Check that you've installed all requirements (`pip install -r requirements.txt`)
- Verify Gemini API key is valid

### Rate limit errors:
- Free tier: 15 requests/minute, 1,500/day
- Wait a minute and try again
- Consider upgrading if needed

## Security Notes

✅ **Secure Implementation**

The API key is stored securely on the backend server:
- Gemini API calls are made from the Flask backend only
- Frontend never has access to the API key
- API key is stored in `.env` file (not committed to git)
- This is production-ready and secure
