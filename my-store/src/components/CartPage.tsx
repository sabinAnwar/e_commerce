import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm line-clamp-2">
                {item.title}
              </h3>
              <p className="text-green-600 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 w-8 h-8 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 w-8 h-8 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center mt-6">
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500"
          >
            Clear Cart
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
