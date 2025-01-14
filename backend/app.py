from flask import Flask, jsonify
from flask_cors import CORS
import os
from typing import Dict, Any

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in development

@app.route("/health")
def health_check() -> Dict[str, Any]:
    return jsonify({"status": "healthy", "service": "flask-backend"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8727))
    app.run(debug=True, host="0.0.0.0", port=port) 