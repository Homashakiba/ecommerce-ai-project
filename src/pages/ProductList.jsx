import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

 const addToWishlist = (product) => {
  fetch("http://localhost:5000/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 mt-2 block hover:underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
