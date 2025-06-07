import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DailyReward from './components/DailyReward';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AuthPage from './pages/Auth'; // ✅ Supabase auth page

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <DailyReward />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ Supabase login/signup */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
