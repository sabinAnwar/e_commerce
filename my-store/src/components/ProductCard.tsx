import { Link } from "react-router-dom";
import type { Product } from "../types";
 interface ProductCardProps {
   product: Product;
 } 

function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg border-t-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-transform duration-200 flex
  flex-col"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-3"
      />
      <span className="text-xs font-semibold uppercase tracking-wide text-white bg-blue-500 px-2 py-0.5 rounded self-start">
        {product.category}
      </span>
      <h3 className="text-sm font-bold text-gray-800 mt-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-green-600 font-semibold mt-2">${product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="mt-3 w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded hover:bg-blue-700 transition-colors text-center"
      >
        View Details
      </Link>
    </div>
  );
}
export default ProductCard;
