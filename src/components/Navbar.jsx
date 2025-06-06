import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/products" className="hover:underline">Products</Link></li>
        <li><Link to="/cart" className="hover:underline">Cart</Link></li>
        <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
      </ul>
    </nav>
  );
}
