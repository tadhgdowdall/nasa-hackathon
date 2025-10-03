# BioCosmos Dashboard - Flask Backend

AI-powered NASA bioscience publications API

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python run.py
```

The API will be available at `http://localhost:5001`

**Note:** Port 5001 is used instead of 5000 to avoid conflicts with macOS AirPlay Receiver.

## API Endpoints

### GET /api/health
Health check endpoint
```bash
curl http://localhost:5001/api/health
```

### GET /api/summaries?query=<string>
Search publications by query (returns up to 5 results)
```bash
curl "http://localhost:5001/api/summaries?query=bone"
```

**Response:**
```json
[
  {
    "id": 123,
    "Title": "Publication Title",
    "Summary": "Abstract summary...",
    "Link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC123456/"
  }
]
```

### GET /api/topics
Get topic distribution (top 6 topics with mock data)
```bash
curl http://localhost:5001/api/topics
```

**Response:**
```json
[
  {
    "name": "Human Health",
    "count": 250
  }
]
```

## Data Source

Publications are loaded from: https://github.com/jgalazka/SB_publications/blob/main/SB_publication_PMC.csv

The CSV is automatically downloaded on first run and cached locally in `data/SB_publication_PMC.csv`
