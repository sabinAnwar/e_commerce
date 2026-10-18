import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  if (loading) return <p className="text-center p-10 text-xl">Loading...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Error: {error}</p>;
  if (!product) return null;

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <Link to="/" className="text-blue-600 hover:underline">
        &larr; Back to products
      </Link>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain"
        />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-white bg-blue-500 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>
          <p className="text-3xl text-green-600 font-bold mt-4">
            ${product.price}
          </p>
          {product.rating && (
            <p className="text-sm text-gray-500 mt-2">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
