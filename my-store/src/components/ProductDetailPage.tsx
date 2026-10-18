import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`star-icon ${filled ? "star-filled" : "star-empty"}`}
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
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rounded} />
      ))}
    </span>
  );
}

function flyToCart(sourceImg: HTMLImageElement) {
  const target = document.getElementById("cart-icon-target");
  if (!target) return;

  const start = sourceImg.getBoundingClientRect();
  const end = target.getBoundingClientRect();

  const clone = sourceImg.cloneNode(true) as HTMLImageElement;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${start.left}px`,
    top: `${start.top}px`,
    width: `${start.width}px`,
    height: `${start.height}px`,
    objectFit: "contain",
    zIndex: "9999",
    pointerEvents: "none",
    borderRadius: "9999px",
    transition:
      "left 750ms cubic-bezier(0.5, -0.3, 0.7, 1.2), top 750ms cubic-bezier(0.3, 0.2, 0.6, 1), width 750ms ease-in, height 750ms ease-in, opacity 750ms ease-in, transform 750ms ease-in",
  } as CSSStyleDeclaration);
  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: `${end.left + end.width / 2 - 10}px`,
      top: `${end.top + end.height / 2 - 10}px`,
      width: "20px",
      height: "20px",
      opacity: "0.2",
      transform: "rotate(540deg)",
    } as CSSStyleDeclaration);
  });

  setTimeout(() => {
    clone.remove();
    window.dispatchEvent(new CustomEvent("cart:bump"));
  }, 750);
}

function TrustBadge({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="trust-badge">
      {children}
      <span>{label}</span>
    </div>
  );
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [prevId, setPrevId] = useState(id);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset state during render when the route id changes
  // (React recommends this over synchronous setState in effects).
  if (id !== prevId) {
    setPrevId(id);
    setProduct(null);
    setError(null);
  }

  const loading = !product && !error;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: Product) => setProduct(data))
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (imgRef.current) flyToCart(imgRef.current);
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <main className="pd-state">
        <div className="pd-state-inner">
          <div className="loader" />
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pd-state">
        <div className="pd-error-card">
          <svg
            className="pd-error-icon"
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
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="pd-page">
      <div className="pd-container fade-in">
        <nav className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span className="pd-sep">/</span>
          <span className="pd-crumb">{product.category}</span>
          <span className="pd-sep">/</span>
          <span className="pd-current">{product.title}</span>
        </nav>

        <div className="pd-grid">
          <div className="pd-gallery">
            <span className="pill pill-muted pd-category">
              {product.category}
            </span>
            <img
              ref={imgRef}
              src={product.image}
              alt={product.title}
              className="pd-image"
            />
          </div>

          <div className="pd-info">
            <h1 className="pd-title">{product.title}</h1>

            {product.rating && (
              <div className="pd-rating">
                <StarRating rate={product.rating.rate} />
                <span className="pd-rating-value">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="pd-rating-count">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="pd-price-row">
              <span className="pd-price">${product.price.toFixed(2)}</span>
              <span className="pd-stock">In stock</span>
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="pd-quantity-row">
              <div className="qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="pd-subtotal">
                Subtotal:{" "}
                <strong>${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            <div className="pd-actions">
              <button
                onClick={handleAddToCart}
                className={`btn ${added ? "btn-success" : "btn-primary"} pd-cta`}
              >
                {added ? "Added to cart" : "Add to Cart"}
              </button>
              <Link to="/cart" className="btn btn-outline pd-cta">
                View Cart
              </Link>
            </div>

            <div className="pd-trust">
              <TrustBadge label="Free shipping">
                <svg
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
              </TrustBadge>
              <TrustBadge label="30-day returns">
                <svg
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
              </TrustBadge>
              <TrustBadge label="Secure checkout">
                <svg
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
              </TrustBadge>
            </div>
          </div>
        </div>

        <Link to="/" className="pd-back">
          &larr; Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default ProductDetailPage;
