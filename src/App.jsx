function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <DailyReward />  {/* 👈 This line shows the reward popup */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
