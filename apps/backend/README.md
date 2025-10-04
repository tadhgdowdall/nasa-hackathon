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

### GET /api/summaries?query=<string>&limit=<number>&topic=<string>
Search publications by query and/or browse by topic (default: 20 results, max: 100 for search, 200 for topic browsing)

**Parameters:**
- `query` (optional): Search term (required if topic not provided)
- `limit` (optional): Number of results (default: 20, max: 100 for search, 200 for topic-only browsing)
- `topic` (optional): Filter by topic (required if query not provided)

**Note:** Either `query` or `topic` parameter must be provided. When browsing by topic only, limit can be up to 200.

```bash
# Search with query (20 results)
curl "http://localhost:5001/api/summaries?query=bone"

# Browse by topic only (50 results)
curl "http://localhost:5001/api/summaries?topic=Human%20Health&limit=50"

# Search with topic filter
curl "http://localhost:5001/api/summaries?query=cell&topic=Human%20Health&limit=10"
```

**Response:**
```json
[
  {
    "id": 1,
    "Title": "Publication Title",
    "Summary": "Abstract summary...",
    "Link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC123456/",
    "Topic": "Human Health"
  }
]
```

### GET /api/topics
Get real topic distribution from analyzed data

**Topics:**
- Other (161 publications)
- Human Health (114 publications)
- Microgravity (113 publications)
- Plants (110 publications)
- Cell Biology (76 publications)
- Radiation (23 publications)
- Development (6 publications)
- Metabolism (4 publications)

```bash
curl http://localhost:5001/api/topics
```

**Response:**
```json
[
  {
    "name": "Other",
    "count": 161
  },
  {
    "name": "Human Health",
    "count": 114
  }
]
```

## Data Source

Publications are loaded from: https://github.com/jgalazka/SB_publications/blob/main/SB_publication_PMC.csv

The CSV is automatically downloaded on first run and cached locally in `data/SB_publication_PMC.csv`

## Topic Analysis

Publications are automatically categorized into topics based on keyword matching:

- **Human Health**: bone, muscle, cardiovascular, immune, health, skeletal, cardiac, blood
- **Plants**: plant, arabidopsis, growth, photosynthesis, seed, root, leaf
- **Radiation**: radiation, dna damage, cosmic rays, ionizing, radioprotection
- **Microgravity**: microgravity, weightlessness, gravity, spaceflight, simulated microgravity
- **Cell Biology**: cell, cellular, protein, gene, expression, signaling
- **Development**: development, embryo, differentiation, morphology
- **Metabolism**: metabolism, metabolic, nutrient, oxidative
- **Other**: Publications not matching any topic keywords

Results are saved to:
- `data/SB_publication_categorized.csv` - CSV with Topic column
- `data/topics.json` - Topic distribution for API
