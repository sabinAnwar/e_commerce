import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center p-10 text-xl">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">Error: {error}</p>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
