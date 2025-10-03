import pandas as pd
import requests
from typing import List, Dict
import os

class DataService:
    def __init__(self):
        self.df = None
        self.csv_url = "https://raw.githubusercontent.com/jgalazka/SB_publications/main/SB_publication_PMC.csv"
        self.csv_path = "data/SB_publication_PMC.csv"
        self.load_data()

    def load_data(self):
        """Load CSV data from local file or download from GitHub"""
        try:
            # Try to load from local file first
            if os.path.exists(self.csv_path):
                self.df = pd.read_csv(self.csv_path)
                print(f"Loaded {len(self.df)} publications from local file")
            else:
                # Download from GitHub
                print("Downloading CSV from GitHub...")
                response = requests.get(self.csv_url)
                response.raise_for_status()

                # Save to local file
                os.makedirs(os.path.dirname(self.csv_path), exist_ok=True)
                with open(self.csv_path, 'wb') as f:
                    f.write(response.content)

                self.df = pd.read_csv(self.csv_path)
                print(f"Downloaded and loaded {len(self.df)} publications")
        except Exception as e:
            print(f"Error loading data: {e}")
            # Create empty dataframe with expected columns
            self.df = pd.DataFrame(columns=['Title', 'Abstract', 'PMCID', 'Topic'])

    def search_publications(self, query: str, limit: int = 5) -> List[Dict]:
        """Search publications by query string"""
        if self.df is None or len(self.df) == 0:
            return []

        query_lower = query.lower()

        # Search in title only (CSV only has Title and Link columns)
        mask = self.df['Title'].str.lower().str.contains(query_lower, na=False)

        results = self.df[mask].head(limit)

        # Format results
        publications = []
        for idx, row in results.iterrows():
            title = str(row.get('Title', 'Untitled'))
            link = str(row.get('Link', '#'))

            # Generate mock summary based on title
            summary = f"This NASA bioscience publication explores {title.lower()}. The research provides valuable insights for space exploration and understanding biological processes in microgravity environments."

            publications.append({
                'id': int(idx),
                'Title': title,
                'Summary': summary[:300] + '...' if len(summary) > 300 else summary,
                'Link': link
            })

        return publications

    def get_topics(self) -> List[Dict]:
        """Get topic distribution (mock data for now)"""
        if self.df is None or len(self.df) == 0:
            return []

        # Mock topics since CSV doesn't have topic column
        total = len(self.df)
        return [
            {'name': 'Human Health', 'count': int(total * 0.35)},
            {'name': 'Microgravity Effects', 'count': int(total * 0.25)},
            {'name': 'Plant Biology', 'count': int(total * 0.15)},
            {'name': 'Cell Biology', 'count': int(total * 0.12)},
            {'name': 'Radiation Studies', 'count': int(total * 0.08)},
            {'name': 'Other', 'count': int(total * 0.05)}
        ]

# Singleton instance
data_service = DataService()
