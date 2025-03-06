import requests
from app.config import Config
from app.utils.logger import get_logger

logger = get_logger(__name__)

class NewsService:
    def __init__(self):
        self.api_key = Config.NEWS_API_KEY
        self.base_url = Config.NEWS_API_BASE_URL

    def get_top_news(self, language: str):
        """
        Fetch top news articles for each category from NewsAPI.
        Returns a list of articles with keys: title, category, link.
        """
        results = []
        try:
            # Map each category to its query parameters and endpoint.
            categories_queries = {
                "tech": {"q": "technology", "endpoint": "everything"},
                "crypto": {"q": "crypto finance", "endpoint": "everything"},
                "conflict": {"q": "international conflict", "endpoint": "everything"}
            }
            for cat, params in categories_queries.items():
                query_params = {
                    "q": params["q"],
                    "language": language.lower(),
                    "pageSize": 10,
                    "apiKey": self.api_key
                }
                url = f"{self.base_url}/{params['endpoint']}"
                response = requests.get(url, params=query_params, timeout=10)
                response.raise_for_status()
                data = response.json()
                if data.get("status") == "ok":
                    for article in data.get("articles", []):
                        results.append({
                            "title": article.get("title"),
                            "category": cat,
                            "link": article.get("url")
                        })
                else:
                    logger.error(f"Error fetching {cat} news: {data.get('message')}")
        except Exception as e:
            logger.exception("Exception occurred in get_top_news")
        return results

    def get_article_content(self, url: str):
        """
        Scrape an article from the given URL using newspaper3k.
        Returns a dict with 'title' and 'text', or None on failure.
        """
        from newspaper import Article
        try:
            article = Article(url)
            article.download()
            article.parse()
            return {
                "title": article.title,
                "text": article.text
            }
        except Exception as e:
            logger.exception(f"Error fetching article content from {url}")
            return None