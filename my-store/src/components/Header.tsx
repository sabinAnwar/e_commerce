import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        My Store
      </Link>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="relative hover:underline">
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
