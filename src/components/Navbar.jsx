import { Link } from "react-router-dom";

export default function Navbar() {
  const viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/products" className="hover:underline">Products</Link></li>
        <li><Link to="/cart" className="hover:underline">Cart</Link></li>
        <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
      </ul>

      {/* Explorer badge appears after viewing 3+ unique products */}
      {viewed.length >= 3 && (
        <div className="mt-2 text-sm bg-yellow-300 text-black px-2 py-1 inline-block rounded">
          🏅 Explorer
        </div>
      )}
    </nav>
  );
}
