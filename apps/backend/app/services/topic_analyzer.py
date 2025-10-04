import pandas as pd
import json
import os

class TopicAnalyzer:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.topics_config = {
            "Human Health": ["bone", "muscle", "cardiovascular", "immune", "health", "skeletal", "cardiac", "blood"],
            "Plants": ["plant", "arabidopsis", "growth", "photosynthesis", "seed", "root", "leaf"],
            "Radiation": ["radiation", "dna damage", "cosmic rays", "ionizing", "radioprotection"],
            "Microgravity": ["microgravity", "weightlessness", "gravity", "spaceflight", "simulated microgravity"],
            "Cell Biology": ["cell", "cellular", "protein", "gene", "expression", "signaling"],
            "Development": ["development", "embryo", "differentiation", "morphology"],
            "Metabolism": ["metabolism", "metabolic", "nutrient", "oxidative"],
        }

    def categorize_publication(self, title: str) -> str:
        """Categorize a publication based on title keywords"""
        title_lower = title.lower()

        for topic, keywords in self.topics_config.items():
            for keyword in keywords:
                if keyword in title_lower:
                    return topic

        return "Other"

    def analyze_csv(self) -> tuple:
        """Analyze CSV and categorize publications"""
        print(f"Loading CSV from {self.csv_path}...")
        df = pd.read_csv(self.csv_path)

        print(f"Analyzing {len(df)} publications...")

        # Add topic column
        df['Topic'] = df['Title'].apply(self.categorize_publication)

        # Count publications per topic
        topic_counts = df['Topic'].value_counts().to_dict()

        # Format for API response
        topics_list = [
            {"name": topic, "count": count}
            for topic, count in sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
        ]

        return df, topics_list

    def save_topics_json(self, topics_list: list, output_path: str):
        """Save topics distribution to JSON file"""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, 'w') as f:
            json.dump(topics_list, f, indent=2)

        print(f"Saved topics to {output_path}")

    def save_categorized_csv(self, df: pd.DataFrame, output_path: str):
        """Save categorized publications to new CSV"""
        df.to_csv(output_path, index=False)
        print(f"Saved categorized publications to {output_path}")

    def run(self):
        """Run full analysis pipeline"""
        # Analyze CSV
        df, topics_list = self.analyze_csv()

        # Save results
        topics_json_path = "data/topics.json"
        categorized_csv_path = "data/SB_publication_categorized.csv"

        self.save_topics_json(topics_list, topics_json_path)
        self.save_categorized_csv(df, categorized_csv_path)

        # Print summary
        print("\n=== Topic Distribution ===")
        for topic in topics_list:
            print(f"{topic['name']}: {topic['count']}")
        print(f"Total: {sum(t['count'] for t in topics_list)}")

        return df, topics_list

if __name__ == "__main__":
    analyzer = TopicAnalyzer("data/SB_publication_PMC.csv")
    analyzer.run()
