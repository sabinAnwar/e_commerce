import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useAddToCart } from "../hooks/useAddToCart";
import StarRating from "./StarRating";
import TrustBadges from "./TrustBadges";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, error, loading } = useProduct(id);
  const { imgRef, added, handleAdd } = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) return <Loader message="Loading product..." playful />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <main className="page">
      <div className="page-container fade-in">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">{product.category}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="product-layout">
          <div className="product-image-section">
            <span className="pill pill-muted product-category-badge">
              {product.category}
            </span>
            <img
              ref={imgRef}
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>

          <div className="product-details">
            <h1 className="product-title">{product.title}</h1>

            {product.rating && (
              <div className="product-rating">
                <StarRating rate={product.rating.rate} />
                <span className="rating-score">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="rating-review-count">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="price-section">
              <span className="product-price">${product.price.toFixed(2)}</span>
              <span className="stock-status">In stock</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="quantity-section">
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
              <span className="price-subtotal">
                Subtotal:{" "}
                <strong>${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            <div className="product-actions">
              <button
                onClick={() => handleAdd(product, quantity)}
                className={`btn ${added ? "btn-success" : "btn-primary"} action-button`}
              >
                {added ? "Added to cart" : "Add to Cart"}
              </button>
              <Link to="/cart" className="btn btn-outline action-button">
                View Cart
              </Link>
            </div>

            <TrustBadges />
          </div>
        </div>

        <Link to="/" className="back-to-shop-link">
          &larr; Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default ProductDetailPage;
