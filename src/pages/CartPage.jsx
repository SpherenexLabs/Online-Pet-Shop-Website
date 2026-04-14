import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const { user } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }

      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + 5);

      const payload = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        quantity: totalItems,
        totalPrice,
        orderStatus: "Pending",
        paymentStatus: "Pending",
        address: user.address || "Customer address",
        deliveryLocation: user.address || "Customer address",
        deliveryEstimate: estimatedDate.toISOString(),
      };

      await api.post("/orders", payload);
      clearCart();
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <section className="premium-cart-page">
      <div className="container">
        <div className="lux-section-title left">
          <span>Your Cart</span>
          <h2>Shopping Bag</h2>
          <p>Review your selected products and place your order.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add premium products to continue shopping.</p>
            <a href="/products" className="admin-primary-btn">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="premium-cart-layout">
            <div className="premium-cart-list">
              {cartItems.map((item) => (
                <div key={item._id} className="premium-cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80";
                    }}
                  />
                  <div className="premium-cart-item-info">
                    <h4>{item.productName}</h4>
                    <p>{item.category}</p>
                    <strong>₹{item.price}</strong>
                  </div>

                  <div className="premium-cart-controls">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQty(item._id, e.target.value)}
                    />
                    <button
                      className="danger-lite-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="premium-cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row">
                <span>Total Price</span>
                <strong>₹{totalPrice}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>Free</strong>
              </div>

              <button className="admin-primary-btn full" onClick={placeOrder}>
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="order-success-modal">
            <h3>Order Placed Successfully</h3>
            <p>Your premium pet order has been placed.</p>
            <button
              className="admin-primary-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;