from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from app.config import Config
from app.utils.logger import get_logger

logger = get_logger(__name__)

class SummarizerService:
    def __init__(self):
        try:
            # Initialize ChatOpenAI with specified model and temperature.
            self.chat = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
        except Exception as e:
            logger.exception("Error initializing ChatOpenAI model")
            raise e

    def summarize(self, title: str, text: str, language: str = "EN") -> str:
        """
        Generate a summary for the article.
        If the language is not English, the summary is translated accordingly.
        """
        try:
            if language.upper() == "EN":
                prompt = f"""You are a very good assistant that summarizes online articles.

Here's the article you want to summarize.

==================
Title: {title}

{text}
==================

Write a concise summary of the above article.
"""
            else:
                prompt = f"""You are an advanced AI assistant that summarizes online articles into a concise summary in {language}.

Here's the article you want to summarize.

==================
Title: {title}

{text}
==================

Write the summary in {language}.
"""
            messages = [HumanMessage(content=prompt)]
            summary = self.chat.invoke(messages)
            return summary.content.strip()
        except Exception as e:
            logger.exception("Error generating summary")
            return "Error generating summary."
