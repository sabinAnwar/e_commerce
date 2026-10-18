import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 89.99,
    description: "Lightweight and fast.",
    category: "Footwear",
  },
  {
    id: 2,
    name: "Yoga Mat",
    price: 24.99,
    description: "Non-slip, 6mm thick.",
    category: "Fitness",
  },
  {
    id: 3,
    name: "Water Bottle",
    price: 14.99,
    description: "Insulated, 750ml.",
    category: "Hydration",
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    description: "20L, water resistant.",
    category: "Travel",
  },
  {
    id: 5,
    name: "Headphones",
    price: 129.99,
    description: "Noise cancelling, wireless.",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Coffee Mug",
    price: 12.99,
    description: "Ceramic, 350ml.",
    category: "Kitchen",
  },
];

function App() {
  return (
    <div>
      <Header />
      <Main products={products} />
      <Footer />
    </div>
  );
}

export default App;
