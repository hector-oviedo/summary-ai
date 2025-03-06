from flask import Blueprint, jsonify, request
from app.models import DataStore
from app.services.news_service import NewsService
from app.services.summarizer import SummarizerService
from app.utils.logger import get_logger

logger = get_logger(__name__)

api = Blueprint('api', __name__)

# Initialize services
news_service = NewsService()
summarizer_service = SummarizerService()

@api.route('/languages', methods=['GET'])
def get_languages():
    """
    GET /languages
    Returns a JSON array of supported language objects.
    """
    try:
        return jsonify(DataStore.languages)
    except Exception as e:
        logger.exception("Error in get_languages")
        return jsonify({"error": "Internal server error"}), 500

@api.route('/categories', methods=['GET'])
def get_categories():
    """
    GET /categories
    Returns a JSON array of news category objects.
    """
    try:
        return jsonify(DataStore.categories)
    except Exception as e:
        logger.exception("Error in get_categories")
        return jsonify({"error": "Internal server error"}), 500

@api.route('/news/top', methods=['GET'])
def get_top_news():
    """
    GET /news/top?lang=EN
    Query Param:
      lang - language code (e.g., EN)
    Returns a list of articles with keys: title, category, link.
    """
    try:
        lang = request.args.get("lang", "EN")
        articles = news_service.get_top_news(lang)
        return jsonify(articles)
    except Exception as e:
        logger.exception("Error in get_top_news")
        return jsonify({"error": "Internal server error"}), 500

@api.route('/news', methods=['GET'])
def get_news():
    """
    GET /news?link=<article_link>&lang=EN
    Query Params:
      link - URL of the article
      lang - language code for summary (default EN)
    Returns an object with 'title' and 'content' (the summarized text).
    """
    try:
        link = request.args.get("link")
        lang = request.args.get("lang", "EN")
        if not link:
            return jsonify({"error": "Missing article link"}), 400

        article_data = news_service.get_article_content(link)
        if not article_data:
            return jsonify({"error": "Failed to fetch article"}), 500

        summary = summarizer_service.summarize(article_data["title"], article_data["text"], lang)
        return jsonify({
            "title": article_data["title"],
            "content": summary
        })
    except Exception as e:
        logger.exception("Error in get_news")
        return jsonify({"error": "Internal server error"}), 500
