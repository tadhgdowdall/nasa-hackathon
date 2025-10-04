import os
import json
from typing import Dict, List, Optional

import pandas as pd
import requests


class DataService:
    def __init__(self):
        self.df = None
        self.csv_url = "https://raw.githubusercontent.com/jgalazka/SB_publications/main/SB_publication_PMC.csv"
        self.csv_path = "data/SB_publication_PMC.csv"
        self.categorized_csv_path = "data/SB_publication_categorized.csv"
        self.topics_json_path = "data/topics.json"
        self.load_data()

    def load_data(self):
        """Load CSV data from local file or download from GitHub"""
        try:
            # Try to load categorized CSV first
            if os.path.exists(self.categorized_csv_path):
                self.df = pd.read_csv(self.categorized_csv_path)
                print(f"Loaded {len(self.df)} categorized publications")
            elif os.path.exists(self.csv_path):
                self.df = pd.read_csv(self.csv_path)
                print(f"Loaded {len(self.df)} publications from local file")
                # Run categorization
                self._categorize_publications()
            else:
                # Download from GitHub
                print("Downloading CSV from GitHub...")
                response = requests.get(self.csv_url)
                response.raise_for_status()

                # Save to local file
                os.makedirs(os.path.dirname(self.csv_path), exist_ok=True)
                with open(self.csv_path, "wb") as f:
                    f.write(response.content)

                self.df = pd.read_csv(self.csv_path)
                print(f"Downloaded and loaded {len(self.df)} publications")
                # Run categorization
                self._categorize_publications()
        except Exception as e:
            print(f"Error loading data: {e}")
            # Create empty dataframe with expected columns
            self.df = pd.DataFrame(columns=["Title", "Link", "Topic"])

    def _categorize_publications(self):
        """Run topic analysis if not already done"""
        try:
            from app.services.topic_analyzer import TopicAnalyzer
            analyzer = TopicAnalyzer(self.csv_path)
            self.df, _ = analyzer.run()
            print("Publications categorized successfully")
        except Exception as e:
            print(f"Error categorizing publications: {e}")

    def _extract_keywords(self, query: str) -> List[str]:
        """Extract meaningful keywords from a natural language query"""
        # Common stop words to ignore
        stop_words = {
            'what', 'does', 'do', 'is', 'are', 'how', 'why', 'when', 'where', 'who',
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'about', 'as', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'between', 'under', 'since', 'can',
            'could', 'would', 'should', 'may', 'might', 'will', 'shall', 'have',
            'has', 'had', 'been', 'be', 'being', 'it', 'its', 'itself', 'they',
            'them', 'their', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
            'she', 'we', 'me', 'him', 'her', 'us', 'there'
        }

        # Remove punctuation and split into words
        words = query.lower().replace('?', '').replace('!', '').replace('.', '').replace(',', '').split()

        # Filter out stop words and keep meaningful keywords
        keywords = [word for word in words if word not in stop_words and len(word) > 2]

        return keywords

    def search_publications(self, query: str, limit: int = 20, topic: Optional[str] = None) -> List[Dict]:
        """Search publications by query string and optionally filter by topic"""
        if self.df is None or len(self.df) == 0:
            return []

        # Start with all publications
        filtered_df = self.df.copy()

        # Filter by topic if specified
        if topic and topic != "All":
            filtered_df = filtered_df[filtered_df["Topic"] == topic]

        # Search in title using keyword extraction for better natural language support
        if query:
            # Extract keywords from the natural language query
            keywords = self._extract_keywords(query)

            if keywords:
                # Create a mask that matches any of the keywords
                mask = pd.Series([False] * len(filtered_df), index=filtered_df.index)

                for keyword in keywords:
                    # Add matches for this keyword to the mask
                    keyword_mask = filtered_df["Title"].str.lower().str.contains(keyword, na=False, regex=False)
                    mask = mask | keyword_mask

                filtered_df = filtered_df[mask]
            else:
                # Fallback to original search if no keywords extracted
                query_lower = query.lower()
                mask = filtered_df["Title"].str.lower().str.contains(query_lower, na=False, regex=False)
                filtered_df = filtered_df[mask]

        # Limit results
        results = filtered_df.head(limit)

        # Format results
        publications = []
        for idx, row in results.iterrows():
            title = str(row.get("Title", "Untitled"))
            link = str(row.get("Link", "#"))
            pub_topic = str(row.get("Topic", "Other"))

            # Generate summary based on title and topic
            summary = f"This NASA bioscience publication explores {title.lower()}. Categorized under {pub_topic}, this research provides valuable insights for space exploration and understanding biological processes in microgravity environments."

            publications.append(
                {
                    "id": int(idx),
                    "Title": title,
                    "Summary": summary[:300] + "..." if len(summary) > 300 else summary,
                    "Link": link,
                    "Topic": pub_topic,
                }
            )

        return publications

    def get_topics(self) -> List[Dict]:
        """Get topic distribution from JSON file or calculate from dataframe"""
        # Try to load from JSON file first
        if os.path.exists(self.topics_json_path):
            try:
                with open(self.topics_json_path, 'r') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading topics JSON: {e}")

        # Fallback: calculate from dataframe
        if self.df is None or len(self.df) == 0:
            return []

        if 'Topic' not in self.df.columns:
            return [{'name': 'All Publications', 'count': len(self.df)}]

        topic_counts = self.df['Topic'].value_counts().to_dict()

        return [
            {'name': topic, 'count': int(count)}
            for topic, count in sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
        ]


# Singleton instance
data_service = DataService()
