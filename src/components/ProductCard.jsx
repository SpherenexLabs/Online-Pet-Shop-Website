import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const fullStars = Math.round(product.rating || 4.5);

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.imageUrl} alt={product.productName} />
        <span className="product-tag">{product.petType}</span>

        <div className="product-overlay">
          <Link to={`/products/${product._id}`} className="overlay-btn">
            Quick View
          </Link>
        </div>
      </div>

      <div className="product-body">
        <div className="product-rating-row">
          <div className="product-rating">
            {"★".repeat(fullStars)}
            {"☆".repeat(5 - fullStars)}
          </div>
          <span className="product-rating-number">
            {product.rating?.toFixed(1) || "4.5"}
          </span>
        </div>

        <p className="product-category">{product.category}</p>
        <h3>{product.productName}</h3>
        <p className="product-desc">
          {product.description?.slice(0, 90)}...
        </p>

        <div className="product-bottom">
          <strong>₹{product.price}</strong>
          <span className="stock-text">Stock: {product.stock}</span>
        </div>

        <div className="card-actions">
          <Link to={`/products/${product._id}`} className="admin-primary-btn">
            View
          </Link>
          <button
            className="hero-secondary-btn"
            onClick={() => {
              addToCart(product);
              alert("Added to cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;