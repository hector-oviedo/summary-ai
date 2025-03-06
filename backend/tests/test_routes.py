import pytest
from main import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_get_languages(client):
    response = client.get("/api/languages")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(lang.get("id") == "EN" for lang in data)

def test_get_categories(client):
    response = client.get("/api/categories")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(cat.get("id") == "tech" for cat in data)

def test_get_top_news(client):
    response = client.get("/api/news/top?lang=EN")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    if data:
        article = data[0]
        assert "title" in article
        assert "category" in article
        assert "link" in article

def test_get_news_missing_link(client):
    response = client.get("/api/news?lang=EN")
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
