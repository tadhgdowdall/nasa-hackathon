# BioCosmos Dashboard

AI-powered NASA bioscience publications explorer for the 2025 NASA Space Apps Challenge.

## 🚀 Quick Start

### Backend (Flask)

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Backend runs at: `http://localhost:5001`

### Frontend (Next.js)

```bash
cd apps/frontend
npm install
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
│       │   └── services/  # Data service
│       ├── data/          # Downloaded CSV cache
│       └── requirements.txt
└── README.md
```

## 🌟 Features

- **Search**: Query 607 NASA bioscience publications by title
- **Dashboard**: View stats and explore publications
- **Space Theme**: NASA-inspired UI with animations
- **API Integration**: Flask backend with automatic CSV loading

## 🛠 API Endpoints

- `GET /api/summaries?query=<string>` - Search publications (max 5 results)
- `GET /api/topics` - Get topic distribution
- `GET /api/health` - Health check

## 📊 Data Source

Publications from: [NASA SB Publications](https://github.com/jgalazka/SB_publications)

## 🎨 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Flask, Pandas, Python 3.11
- **Data**: NASA Life Sciences CSV (607 publications)
