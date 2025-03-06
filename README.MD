# summary-ai

summary-ai is a full-stack news articles summarizer that leverages modern AI tools. The backend uses Flask, LangChain, and OpenAI to scrape, summarize, and translate news articles. The frontend (built in React) provides an interactive interface for language selection, article listing, and detailed article views.

## Index
- [Backend Functionality](#backend-functionality)
- [GET API Services](#get-api-services)
- [Requirements](#requirements)
- [Installation Instructions](#installation-instructions)
- [Environment Variables](#environment-variables)
- [Frontend](#frontend)

## Backend Functionality

The backend is built with Flask and is responsible for:
- **Scraping Articles:** Using newspaper3k to extract titles and texts from news URLs.
- **Summarization:** Using LangChain and OpenAI (via ChatOpenAI) to generate concise summaries of articles. It supports translations by receiving a language parameter.
- **News Fetching:** Integrates with a free news API to provide top articles for various categories (Tech Trends, Crypto Financial News, International Conflicts).
- **Endpoints:** Exposes several GET endpoints for languages, news categories, top news, and detailed article summarization.
- **Error Handling & Logging:** Uses try/catch blocks and a dedicated logging utility to ensure issues are well documented.
- **Isolation:** Business logic is isolated in service classes for ease of debugging and future maintenance.

## GET API Services

| Endpoint                                  | Parameters                                                      | Output Format                                                                                                                                                      |
| ----------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/languages`                          | None                                                            | Array of language objects. Example: `[{"id": "EN", "label": "English"}, {"id": "ES", "label": "Español"}, {"id": "FR", "label": "Français"}]`                 |
| `/api/categories`                         | None                                                            | Array of category objects. Example: `[{"id": "tech", "label": "Tech Trends"}, {"id": "crypto", "label": "Crypto Financial News"}, {"id": "conflict", "label": "International Conflicts"}]` |
| `/api/news/top?lang=<LANG_CODE>`           | `lang`: language code (e.g. `EN`, `ES`, etc.)                     | Array of articles. Each article has keys: `title`, `category`, and `link`. Example: `[{"title": "Article Title", "category": "tech", "link": "http://..."}, ...]`      |
| `/api/news?link=<ARTICLE_LINK>&lang=<LANG>` | `link`: URL of the news article<br>`lang`: language code (default `EN`) | An object with the article's `title` and `content` (the generated summary). Example: `{"title": "Article Title", "content": "Summary text..."}`                      |

## Requirements

You will need an OpenAI API key and a [NewsAPI](https://newsapi.org/) key before running the project.

The project uses the following libraries:

- Flask  
- newspaper3k  
- python-dotenv  
- langchain  
- openai  
- pytest  
- langchain-openai  
- "lxml[html_clean]"

## Installation Instructions

1. **Clone the repository:**

`` 
git clone https://github.com/hector-oviedo/summary-ai
``

2. **Navigate to the backend folder:**

`` 
cd summary-ai/backend
``

3. **Create a virtual environment and activate it (optional but recommended):**

`` 
python -m venv venv
source venv/bin/activate  (or venv\Scripts\activate on Windows)
``

4. **Install the required dependencies:**

`` 
pip install -r requirements.txt
``

5. **Create a `.env` file in the backend directory with the following content:**

`` 
OPENAI_API_KEY=your_openai_api_key
NEWS_API_KEY=your_news_api_key
``

6. **Run the Flask application locally:**

`` 
python main.py
``

The backend API will be available at `http://127.0.0.1:5000`.

## Environment Variables

The application requires the following environment variables to be set in the `.env` file:

- **OPENAI_API_KEY:** Your OpenAI API key, used for summarization via ChatOpenAI.  
- **NEWS_API_KEY:** Your API key for the chosen news service, used to fetch news articles.

This setup ensures that summary-ai runs locally with all necessary configuration. The backend handles article scraping, summarization (with language translation support), and serves the data through RESTful endpoints.

## Frontend

In progress!