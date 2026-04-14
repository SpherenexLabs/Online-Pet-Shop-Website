import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (error) {
        toast.error("Failed to fetch your orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="my-orders-page">
      <div className="container">
        <div className="lux-section-title left">
          <span>Your Orders</span>
          <h2>Order History</h2>
          <p>Track your ordered products, amount paid and delivery details.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-premium-box">
            <h3>No orders yet</h3>
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="my-orders-list">
            {orders.map((order) => (
              <div className="my-order-card" key={order._id}>
                <div className="my-order-top">
                  <div>
                    <h3>Order ID: {order._id.slice(-8).toUpperCase()}</h3>
                    <p>
                      Ordered On:{" "}
                      {new Date(order.createdAt || order.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="my-order-statuses">
                    <span className="order-badge">{order.orderStatus}</span>
                    <span className="payment-badge">{order.paymentStatus}</span>
                  </div>
                </div>

                <div className="my-order-meta-grid">
                  <div>
                    <strong>Total Amount</strong>
                    <p>₹{order.totalPrice}</p>
                  </div>
                  <div>
                    <strong>Total Quantity</strong>
                    <p>{order.quantity}</p>
                  </div>
                  <div>
                    <strong>Delivery Place</strong>
                    <p>{order.deliveryLocation || order.address}</p>
                  </div>
                  <div>
                    <strong>Delivery Estimate</strong>
                    <p>
                      {order.deliveryEstimate
                        ? new Date(order.deliveryEstimate).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                </div>

                <div className="ordered-products-grid">
                  {order.products?.map((item, index) => (
                    <div className="ordered-product-card" key={index}>
                      <img
                        src={item.productId?.imageUrl}
                        alt={item.productId?.productName}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80";
                        }}
                      />
                      <div className="ordered-product-content">
                        <h4>{item.productId?.productName || "Product"}</h4>
                        <p>{item.productId?.category || "Category"}</p>
                        <p>Pet Type: {item.productId?.petType || "-"}</p>
                        <strong>
                          ₹{item.productId?.price || 0} × {item.quantity}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-order-address-box">
                  <strong>Delivery Address</strong>
                  <p>{order.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrders;