import google.generativeai as genai
import os
from typing import List, Dict
from datetime import datetime, timedelta
from collections import deque

class ChatbotService:
    def __init__(self):
        self.model = None
        self._initialized = False

        # Rate limiting to protect free tier
        # Free tier limits: 15 RPM (requests per minute), 1500 RPD (requests per day)
        self.rpm_limit = 15
        self.rpd_limit = 1500

        # Track request timestamps
        self.minute_requests = deque()  # Stores timestamps of requests in the last minute
        self.daily_requests = deque()   # Stores timestamps of requests in the last day

    def _initialize(self):
        """Lazy initialization of the Gemini model"""
        if self._initialized:
            return

        # Configure Gemini API with key from environment
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)
        # Use Gemini 2.5 Flash (stable free tier model released June 2025)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self._initialized = True

    def _check_rate_limit(self) -> tuple[bool, str]:
        """
        Check if we're within rate limits

        Returns:
            (is_allowed, error_message)
        """
        now = datetime.now()

        # Clean up old requests from minute tracking (older than 60 seconds)
        minute_ago = now - timedelta(seconds=60)
        while self.minute_requests and self.minute_requests[0] < minute_ago:
            self.minute_requests.popleft()

        # Clean up old requests from daily tracking (older than 24 hours)
        day_ago = now - timedelta(hours=24)
        while self.daily_requests and self.daily_requests[0] < day_ago:
            self.daily_requests.popleft()

        # Check minute limit
        if len(self.minute_requests) >= self.rpm_limit:
            return False, f"Rate limit exceeded: {self.rpm_limit} requests per minute. Please wait a moment."

        # Check daily limit
        if len(self.daily_requests) >= self.rpd_limit:
            return False, f"Daily limit exceeded: {self.rpd_limit} requests per day. Please try again tomorrow."

        return True, ""

    def _record_request(self):
        """Record a new request timestamp"""
        now = datetime.now()
        self.minute_requests.append(now)
        self.daily_requests.append(now)

    def generate_response(self, query: str, search_results: List[Dict]) -> str:
        """
        Generate an AI response based on the user query and search results

        Args:
            query: User's natural language question
            search_results: List of publication summaries from the database

        Returns:
            AI-generated response as a string
        """
        try:
            # Check rate limits before making API call
            is_allowed, error_msg = self._check_rate_limit()
            if not is_allowed:
                raise ValueError(error_msg)

            # Initialize the model if not already done
            self._initialize()

            # Format search results as context for the LLM
            if not search_results:
                return f"No studies found for \"{query}\". Try a different question or browse by topic."

            context = self._format_context(search_results)

            # Create the prompt for Gemini
            prompt = f"""You are a helpful space biology research assistant analyzing NASA publications.
Provide clear, concise answers based on the research summaries provided.
Cite study titles when relevant. Keep responses under 300 words.

Question: {query}

Relevant Research from NASA Publications:

{context}

Based on these studies, please provide a clear and informative answer to the question."""

            # Generate response using Gemini
            response = self.model.generate_content(prompt)

            # Record successful request
            self._record_request()

            return response.text

        except ValueError as e:
            # Re-raise rate limit errors
            raise
        except Exception as e:
            # Check if it's a quota exceeded error from Google
            error_str = str(e).lower()
            if 'quota' in error_str or 'rate limit' in error_str or '429' in error_str:
                raise ValueError("API quota exceeded. Please try again later.")

            print(f"Error generating chatbot response: {str(e)}")
            raise

    def _format_context(self, results: List[Dict]) -> str:
        """Format search results into a context string for the LLM"""
        formatted = []
        for i, result in enumerate(results[:10], 1):  # Limit to top 10 results
            title = result.get('Title', 'N/A')
            summary = result.get('Summary', 'N/A')
            topic = result.get('Topic', 'N/A')
            formatted.append(f"Study {i}: {title}\nSummary: {summary}\nTopic: {topic}")

        return '\n\n'.join(formatted)

# Singleton instance
chatbot_service = ChatbotService()
