import pytest
from app.services.news_service import NewsService

def test_get_top_news_returns_list():
    ns = NewsService()
    articles = ns.get_top_news("en")
    assert isinstance(articles, list)

def test_get_article_content_invalid_url():
    ns = NewsService()
    result = ns.get_article_content("http://invalid.url")
    assert result is None or isinstance(result, dict)
