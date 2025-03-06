from flask import Flask
from flask_cors import CORS
from app.routes import api
from app.config import Config
from app.utils.logger import get_logger

logger = get_logger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # Enable CORS to allow requests from http://localhost:5173
    CORS(app, origins=["http://localhost:5173"])
    app.register_blueprint(api, url_prefix="/api")
    return app

app = create_app()

if __name__ == "__main__":
    try:
        logger.info("Starting Flask app...")
        app.run(host="0.0.0.0", port=5000, debug=app.config["DEBUG"])
    except Exception as e:
        logger.exception("Failed to start Flask app")
