interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  category: string;
}
function ProductCard({ name, price, description, category }: ProductCardProps) {
  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg border-t-4 border-blue-500 hover:shadow-xl
   hover:-translate-y-1 transition-transform duration-200"
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide text-white bg-blue-500 px-2
   py-0.5 rounded"
      >
        {category}
      </span>
      <h3 className="text-lg font-bold text-gray-800 mt-2">{name}</h3>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
      <p className="text-green-600 font-semibold mt-2">${price}</p>
      <button
        className="mt-3 w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded
  hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
