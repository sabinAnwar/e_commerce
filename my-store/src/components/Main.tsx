import ProductCard from "./ProductCard";
import type { Product } from "../types";

interface MainProps {
  products: Product[];
}

function Main({ products }: MainProps) {
  return (
    <main className="pd-page">
      <div className="pd-container">
        <h2 className="cart-title" style={{ textAlign: "center" }}>
          Our Products
        </h2>
        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
