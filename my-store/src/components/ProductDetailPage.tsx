import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-yellow-400" : "text-slate-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
}

function StarRating({ rate }: { rate: number }) {
  const rounded = Math.round(rate);
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rounded} />
      ))}
    </span>
  );
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <svg
            className="mx-auto mb-3 h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.34 3.94l-7.5 13A1.75 1.75 0 004.34 19.5h15.32a1.75 1.75 0 001.5-2.56l-7.5-13a1.75 1.75 0 00-3 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-slate-800">Something went wrong</h2>
          <p className="text-slate-500 mt-2">{error}</p>
          <Link
            to="/"
            className="inline-block mt-5 px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-6 text-sm text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-slate-900 transition">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="capitalize hover:text-slate-900 transition">
            {product.category}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-200 p-8 lg:p-12 flex items-center justify-center">
            <span className="absolute top-5 left-5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[420px] w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-8 lg:p-12 flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-3 mt-3">
                <StarRating rate={product.rating.rate} />
                <span className="text-sm text-slate-600 font-medium">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="text-sm text-slate-400">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-4xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
                In stock
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed mt-5">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="cursor-pointer px-4 py-2 text-lg text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-slate-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="cursor-pointer px-4 py-2 text-lg text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-slate-500">
                Subtotal:{" "}
                <span className="font-semibold text-slate-800">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
                  added
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-slate-900 hover:bg-slate-700 hover:shadow-lg"
                }`}
              >
                {added ? "Added to cart" : "Add to Cart"}
              </button>
              <Link
                to="/cart"
                className="flex-1 py-3 rounded-xl font-semibold text-center text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition"
              >
                View Cart
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs text-slate-500">
              <div className="flex flex-col items-center text-center">
                <svg
                  className="h-6 w-6 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 6.75h12v9H3zM15 10.5h3.75L21 13.5v2.25h-6"
                  />
                </svg>
                <span className="mt-1 font-medium">Free shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className="h-6 w-6 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                <span className="mt-1 font-medium">30-day returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className="h-6 w-6 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a1.5 1.5 0 001.5-1.5v-8.25a1.5 1.5 0 00-1.5-1.5H6.75a1.5 1.5 0 00-1.5 1.5v8.25a1.5 1.5 0 001.5 1.5z"
                  />
                </svg>
                <span className="mt-1 font-medium">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1 mt-6 text-sm text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default ProductDetailPage;
