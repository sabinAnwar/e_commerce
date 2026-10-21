import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useAddToCart } from "../hooks/useAddToCart";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { imgRef, added, handleAdd } = useAddToCart();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border border-slate-100">
      <Link
        to={`/product/${product.id}`}
        className="relative bg-linear-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center h-48"
      >
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">
          {product.category}
        </span>
        <img
          ref={imgRef}
          src={product.image}
          alt={product.title}
          className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-slate-900 hover:underline transition min-h-10"
        >
          {product.title}
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
            <svg
              className="h-3.5 w-3.5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="font-medium text-slate-700">
              {product.rating.rate.toFixed(1)}
            </span>
            <span>({product.rating.count})</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => handleAdd(product)}
            className={`cursor-pointer text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
