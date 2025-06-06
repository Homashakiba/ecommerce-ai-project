import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

useEffect(() => {
  const viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

  if (!viewed.includes(id)) {
    viewed.push(id);
    localStorage.setItem("viewed", JSON.stringify(viewed));
  }
}, [id]);

  const handleAddToCart = () => {
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "Added to cart"))
      .catch((err) => console.error("Error adding to cart:", err));
  };

  if (!product) return <p className="mt-6">Loading product...</p>;
  if (product.error) return <p className="mt-6 text-red-500">Product not found.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="mt-2 text-lg">${product.price}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
