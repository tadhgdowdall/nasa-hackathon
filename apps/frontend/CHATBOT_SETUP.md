# AI Chatbot Setup Instructions

## Quick Start

### 1. Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 2. Add API Key to Environment
Edit `apps/frontend/.env.local`:
```bash
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Restart Frontend Server
```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

## Testing the Chatbot

### Example Questions:
- "What does microgravity do to bones?"
- "How does radiation affect plants in space?"
- "What are the effects of spaceflight on the immune system?"

### How It Works:
1. User asks a natural language question
2. Backend searches NASA publications for relevant summaries
3. OpenAI analyzes the summaries and generates an intelligent response
4. Results display below the chatbot response

## Cost Estimate

Using `gpt-4o-mini`:
- **Input:** $0.150 per 1M tokens
- **Output:** $0.600 per 1M tokens
- **Typical query:** ~2,000 input tokens + 500 output tokens
- **Cost per query:** ~$0.0006 (less than a cent)
- **100 queries:** ~$0.06

OpenAI provides $5 in free credits for new accounts.

## Troubleshooting

### "API key not configured" message:
- Make sure `.env.local` exists in `apps/frontend/`
- Verify the key starts with `sk-`
- Restart the Next.js dev server

### No response from chatbot:
- Check browser console for errors (F12)
- Verify Flask backend is running on port 5001
- Check OpenAI API key has credits

### Rate limit errors:
- Free tier: 3 requests/minute
- Paid tier (Tier 1): 500 requests/minute
- Wait a minute and try again

## Production Notes

⚠️ **For hackathon demo only!**

The current implementation uses `dangerouslyAllowBrowser: true` to call OpenAI directly from the browser.

**For production:**
- Move OpenAI calls to a Next.js API route (`app/api/chat/route.ts`)
- Use `OPENAI_API_KEY` (without `NEXT_PUBLIC_` prefix)
- This keeps the API key secure on the server
