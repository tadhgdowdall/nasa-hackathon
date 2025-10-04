# BioCosmos - Space Biology Knowledge Engine

AI-powered NASA bioscience publications explorer for the 2025 NASA Space Apps Challenge.

**Challenge**: Build a Space Biology Knowledge Engine

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Gemini API key (free tier) from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Backend (Flask)

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file and add your Gemini API key
echo "GEMINI_API_KEY=your-api-key-here" > .env

python run.py
```

Backend runs at: `http://localhost:5001`

### Frontend (Next.js)

```bash
# From project root
npm install
cd apps/frontend
npm run dev
```

Frontend runs at: `http://localhost:3000`

## 📁 Project Structure

```
nasa-hackathon/
├── apps/
│   ├── frontend/          # Next.js dashboard
│   │   ├── src/
│   │   │   ├── app/       # Pages and routes
│   │   │   │   ├── dashboard/   # Main dashboard with search
│   │   │   │   └── page.tsx     # Landing page
│   │   │   └── components/      # React components
│   │   └── package.json
│   └── backend/           # Flask API
│       ├── app/
│       │   ├── routes/    # API endpoints
│       │   ├── services/  # Data & AI services
│       │   │   ├── data_service.py      # Search & data processing
│       │   │   └── chatbot_service.py   # Gemini AI integration
│       ├── data/          # Downloaded CSV cache
│       └── requirements.txt
└── README.md
```

## 🌟 Features

- **AI-Enhanced Search**: Natural language keyword extraction with stop words filtering for intelligent search queries
- **AI Chatbot**: Ask questions in plain English using Google Gemini AI (e.g., "What does microgravity do to bones?")
- **Topic Filtering**: Browse 608 publications across 8 research categories
- **Visual Analytics**: Interactive topic distribution chart showing research trends and gaps
- **Cinematic 3D Background**: Realistic Earth-like planet with NASA textures, dynamic star fields, and atmospheric effects
- **Smart Summaries**: AI-generated publication summaries highlighting key findings and mission relevance
- **Rate Limiting**: Built-in safeguards for Gemini free tier (15 requests/minute, 1,500/day)

## 🛠 API Endpoints

- `GET /api/summaries?query=<string>&topic=<string>&limit=<int>` - Search publications with optional topic filter
- `POST /api/chat` - AI chatbot endpoint (body: `{query: string, limit: number}`)
- `GET /api/topics` - Get topic distribution statistics
- `GET /api/health` - Health check

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **HTTP Client**: Axios
- **Charts**: Recharts

### Backend
- **Framework**: Flask (Python 3.11)
- **Data Processing**: Pandas
- **AI**: Google Generative AI (Gemini 2.5 Flash)
- **Environment**: python-dotenv

## 📊 Data Source

**NASA Space Biology Publications Dataset**
- Source: [NASA SB Publications](https://github.com/jgalazka/SB_publications)
- Coverage: 608 bioscience publications relevant to Moon and Mars missions
- Format: CSV with titles, summaries, topics, and publication details

## 📚 References & Credits

### Data & APIs
- **NASA Space Biology Publications**: Dataset provided by NASA for the Space Apps Challenge. Source repository: https://github.com/jgalazka/SB_publications
- **Google Gemini API**: AI language model by Google. Model used: `gemini-2.5-flash` (free tier). Documentation: https://ai.google.dev/

### Visual Assets
- **Hero Background Image**: "Astronaut in Outer Space" by NASA on Unsplash. Photo by NASA. URL: https://unsplash.com/photos/Q1p7bh3SHj8. License: Unsplash License (free to use).
- **Planet Textures**: NASA planetary texture maps from Three.js examples repository. Textures include Earth color map, normal map, specular map, and cloud layer. Source: https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets. License: MIT License.

### Libraries & Frameworks
- **Three.js**: 3D graphics library by Ricardo Cabello (Mr.doob). Used for cinematic space background. License: MIT. URL: https://threejs.org/
- **React Three Fiber**: React renderer for Three.js by Poimandres. License: MIT. URL: https://github.com/pmndrs/react-three-fiber
- **@react-three/drei**: Helper components for React Three Fiber by Poimandres. License: MIT. URL: https://github.com/pmndrs/drei
- **Next.js**: React framework by Vercel. License: MIT. URL: https://nextjs.org/
- **Tailwind CSS**: Utility-first CSS framework. License: MIT. URL: https://tailwindcss.com/
- **shadcn/ui**: Re-usable component library. License: MIT. URL: https://ui.shadcn.com/
- **Flask**: Python web framework. License: BSD-3-Clause. URL: https://flask.palletsprojects.com/
- **Recharts**: Composable charting library. License: MIT. URL: https://recharts.org/

### Additional Resources
- NASA imagery and branding guidelines followed from: https://www.nasa.gov/multimedia/guidelines/
- Stop words list for search functionality adapted from common English stop words corpus

## 📝 License

This project was created for the 2025 NASA Space Apps Challenge. All third-party assets and libraries are credited above with their respective licenses.

## 🙏 Acknowledgments

- NASA Space Apps Challenge organizers and mentors
- NASA Space Biology program for providing the publications dataset
- Google for providing free-tier access to Gemini AI
- Three.js and React Three Fiber communities for 3D graphics tools
- Unsplash and NASA for freely available space imagery
