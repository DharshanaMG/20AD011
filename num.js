from flask import Flask, jsonify, request
import requests
import json

app = Flask(__name__)

def get_numbers_from_url(url):
    try:
        response = requests.get(url)
        data = response.json()
        return data.get("numbers", [])
    except Exception as e:
        print(f"Error fetching numbers from {url}: {e}")
        return []

@app.route("/numbers", methods=["GET"])
def get_numbers():
    urls = request.args.getlist("url")
    numbers = []

    for url in urls:
        numbers.extend(get_numbers_from_url(url))

    return jsonify({"numbers": numbers})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8008)
