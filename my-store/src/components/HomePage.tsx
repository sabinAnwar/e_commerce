import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

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

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...unique];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-900 border-t-transparent" />
      </main>
    );
  }

  if (error) {
    return (
      <p className="text-center p-10 text-red-500">Error: {error}</p>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Our Products
          </h2>
          <p className="mt-2 text-slate-500">
            Browse the collection by category
          </p>
        </header>

        <div className="max-w-xl mx-auto mb-6 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 10.5a7.5 7.5 0 0012.9 6.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                  active
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-slate-500">
          <span>
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredProducts.length}
            </span>{" "}
            of {products.length} products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500">
              No products found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
