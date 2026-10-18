import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalItems } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onBump = () => {
      setBump(true);
      window.setTimeout(() => setBump(false), 600);
    };
    window.addEventListener("cart:bump", onBump);
    return () => window.removeEventListener("cart:bump", onBump);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-slate-900"
        >
          MY<span className="text-slate-400">/</span>STORE
        </Link>

        <nav className="flex gap-6 items-center">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-sm font-medium transition ${
                isActive
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            <span
              id="cart-icon-target"
              className={`inline-block ${bump ? "cart-bump" : ""}`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.46 0 .865-.316.976-.763l1.797-7.19a.75.75 0 00-.728-.93H5.106M7.5 14.25L5.106 5.367M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-3 bg-slate-900 text-white text-[10px] font-bold rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center ${
                  bump ? "cart-badge-pop" : ""
                }`}
              >
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
