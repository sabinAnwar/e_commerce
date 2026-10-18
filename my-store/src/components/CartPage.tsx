import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="cart-empty">
        <div className="cart-empty-card">
          <svg
            className="cart-empty-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.46 0 .865-.316.976-.763l1.797-7.19a.75.75 0 00-.728-.93H5.106M7.5 14.25L5.106 5.367"
            />
          </svg>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-sub">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <p className="cart-count">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </header>

        <div className="cart-layout">
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="cart-item-info">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-title"
                  >
                    {item.title}
                  </Link>
                  <span className="pill pill-muted">{item.category}</span>
                  <p className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="qty-selector">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <h3 className="cart-summary-title">Order summary</h3>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="cart-free">Free</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary cart-checkout">
              Checkout
            </button>
            <button className="cart-clear" onClick={clearCart}>
              Clear cart
            </button>
            <Link to="/" className="cart-continue">
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
