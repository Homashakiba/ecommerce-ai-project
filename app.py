if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy product data (normally comes from a database)
products = [
    {"id": 1, "name": "Smart Watch", "price": 99},
    {"id": 2, "name": "AI Headphones", "price": 149},
    {"id": 3, "name": "Robot Vacuum", "price": 299}
]

# Simple in-memory cart (will reset when server restarts)
cart = []

wishlist = []

# ✅ Root route to verify backend is running
@app.route("/")
def home():
    return "Backend is running!"


@app.route("/products", methods=["GET"])
def get_products():
    query = request.args.get("q", "").lower()
    filtered = []

    for p in products:
        match = True

        # Keyword match (name)
        if query:
            if not any(word in p["name"].lower() for word in query.split()):
                match = False

        # Price filter: under
        if "under" in query:
            try:
                price_limit = int(query.split("under")[-1].strip().split()[0])
                if p["price"] >= price_limit:
                    match = False
            except:
                pass

        # Price filter: over
        if "over" in query:
            try:
                price_limit = int(query.split("over")[-1].strip().split()[0])
                if p["price"] <= price_limit:
                    match = False
            except:
                pass

        if match:
            filtered.append(p)

    return jsonify(filtered)


@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404


@app.route("/cart", methods=["GET", "POST"])
def manage_cart():
    if request.method == "POST":
        item = request.json
        cart.append(item)
        return jsonify({"message": "Added to cart"}), 201
    return jsonify(cart)


@app.route("/wishlist", methods=["GET", "POST", "DELETE"])
def handle_wishlist():
    if request.method == "POST":
        item = request.json
        if item not in wishlist:
            wishlist.append(item)
        return jsonify({"message": "Added to wishlist"}), 201

    if request.method == "DELETE":
        item = request.json
        wishlist[:] = [i for i in wishlist if i["id"] != item["id"]]
        return jsonify({"message": "Removed from wishlist"}), 200

    return jsonify(wishlist)


if __name__ == "__main__":
    app.run(debug=True)
