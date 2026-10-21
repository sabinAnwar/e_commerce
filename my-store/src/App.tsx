import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import MilestonesCovered from "./components/MilestonesCovered";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/milestones" element={<MilestonesCovered />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
