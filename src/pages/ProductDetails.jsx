import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="page">
        <div className="container">
          <div className="loading-box">Loading product details...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <div className="details-topbar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <motion.div
          className="product-detail-premium"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="detail-image-box">
            <img src={product.imageUrl} alt={product.productName} />
          </div>

          <div className="detail-content-box">
            <span className="detail-tag">{product.petType}</span>
            <h2>{product.productName}</h2>
            <p className="detail-category">{product.category}</p>
            <p className="detail-description">{product.description}</p>

            <div className="detail-points">
              <div>
                <strong>Price</strong>
                <p>₹{product.price}</p>
              </div>
              <div>
                <strong>Stock</strong>
                <p>{product.stock}</p>
              </div>
              <div>
                <strong>Pet Type</strong>
                <p>{product.petType}</p>
              </div>
            </div>

            <div className="detail-action-row">
              <button
                className="admin-primary-btn"
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart");
                }}
              >
                Add to Cart
              </button>
              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/products")}
              >
                View More Products
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetails;