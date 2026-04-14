import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingId, setEditingId] = useState(null);

  const [productForm, setProductForm] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    petType: "",
    rating: "4.5",
  });

  const fetchAll = async () => {
    try {
      const [p, o, u, c] = await Promise.all([
        api.get("/admin/products"),
        api.get("/admin/orders"),
        api.get("/admin/users"),
        api.get("/admin/contacts"),
      ]);

      setProducts(p.data);
      setOrders(o.data);
      setUsers(u.data);
      setContacts(c.data);
    } catch (error) {
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
  }, [orders]);

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setProductForm({
      productName: "",
      category: "",
      price: "",
      description: "",
      stock: "",
      imageUrl: "",
      petType: "",
      rating: "4.5",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, productForm);
        toast.success("Product updated successfully");
      } else {
        await api.post("/admin/products", productForm);
        toast.success("Product added successfully");
      }

      resetForm();
      fetchAll();
      setActiveTab("products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setProductForm({
      productName: product.productName,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
      imageUrl: product.imageUrl,
      petType: product.petType,
      rating: product.rating ?? "4.5",
    });
    setActiveTab("add");
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      toast.success("Product deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/admin/orders/${id}`);
      toast.success("Order deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/admin/contacts/${id}`);
      toast.success("Contact deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  const updateOrderStatus = async (id, orderStatus, paymentStatus) => {
    try {
      await api.put(`/admin/orders/${id}`, { orderStatus, paymentStatus });
      toast.success("Order updated");
      fetchAll();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order");
    }
  };

  return (
    <section className="premium-admin-page">
      <div className="premium-admin-layout container">
        <aside className="premium-admin-sidebar">
          <div className="admin-side-brand">
            <div className="admin-side-logo">PS</div>
            <div>
              <h3>PetSphere</h3>
              <p>Store Admin</p>
            </div>
          </div>

          <button
            className={`sidebar-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`sidebar-btn ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              resetForm();
              setActiveTab("add");
            }}
          >
            {editingId ? "Edit Product" : "Add Product"}
          </button>
          <button
            className={`sidebar-btn ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`sidebar-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`sidebar-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`sidebar-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
        </aside>

        <div className="premium-admin-content">
          <div className="admin-hero-panel">
            <div>
              <span className="dashboard-badge">ADMIN DASHBOARD</span>
              <h1>Store Management</h1>
              <p>Monitor products, orders, users and customer messages.</p>
            </div>

            <div className="admin-hero-mini-cards">
              <div className="hero-mini-card">
                <span>Products</span>
                <strong>{products.length}</strong>
              </div>
              <div className="hero-mini-card">
                <span>Orders</span>
                <strong>{orders.length}</strong>
              </div>
              <div className="hero-mini-card">
                <span>Revenue</span>
                <strong>₹{totalRevenue}</strong>
              </div>
            </div>
          </div>

          {activeTab === "overview" && (
            <>
              <div className="premium-stats-grid">
                <div className="premium-stat-card">
                  <p>Total Products</p>
                  <h3>{products.length}</h3>
                </div>
                <div className="premium-stat-card">
                  <p>Total Orders</p>
                  <h3>{orders.length}</h3>
                </div>
                <div className="premium-stat-card">
                  <p>Total Users</p>
                  <h3>{users.length}</h3>
                </div>
                <div className="premium-stat-card">
                  <p>Messages</p>
                  <h3>{contacts.length}</h3>
                </div>
              </div>

              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Recent Products</h3>
                  {products.slice(0, 5).map((item) => (
                    <div className="overview-row" key={item._id}>
                      <div>
                        <strong>{item.productName}</strong>
                        <p>{item.category}</p>
                      </div>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="overview-card">
                  <h3>Recent Orders</h3>
                  {orders.slice(0, 5).map((item) => (
                    <div className="overview-row" key={item._id}>
                      <div>
                        <strong>{item.orderStatus}</strong>
                        <p>{item.paymentStatus}</p>
                      </div>
                      <span>₹{item.totalPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "add" && (
            <div className="premium-panel">
              <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSubmit} className="premium-admin-form">
                <div className="grid-2">
                  <input
                    name="productName"
                    placeholder="Product Name"
                    value={productForm.productName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="category"
                    placeholder="Category"
                    value={productForm.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid-3">
                  <input
                    name="price"
                    placeholder="Price"
                    value={productForm.price}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="stock"
                    placeholder="Stock"
                    value={productForm.stock}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="petType"
                    placeholder="Pet Type"
                    value={productForm.petType}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid-2">
                  <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={productForm.imageUrl}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="rating"
                    placeholder="Rating"
                    value={productForm.rating}
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />

                <div className="admin-form-actions">
                  <button className="admin-primary-btn" type="submit">
                    {editingId ? "Update Product" : "Add Product"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="hero-secondary-btn"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {activeTab === "products" && (
            <div className="premium-panel">
              <h2>All Products</h2>
              <div className="list-stack">
                {products.map((item) => (
                  <div className="premium-list-row" key={item._id}>
                    <div className="premium-list-left">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80";
                        }}
                      />
                      <div>
                        <strong>{item.productName}</strong>
                        <p>
                          {item.category} | {item.petType} | Stock: {item.stock}
                        </p>
                      </div>
                    </div>

                    <div className="premium-list-right">
                      <span>₹{item.price}</span>
                      <button
                        className="edit-lite-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="danger-lite-btn"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="premium-panel">
              <h2>All Orders</h2>
              <div className="list-stack">
                {orders.map((item) => (
                  <div className="premium-list-row admin-full-row" key={item._id}>
                    <div className="admin-order-info">
                      <strong>Order Amount: ₹{item.totalPrice}</strong>
                      <p>
                        Customer: {item.userId?.username || "User"} | Address: {item.address}
                      </p>
                      <p>
                        Items:{" "}
                        {item.products?.map((p, index) => (
                          <span key={index}>
                            {p.productId?.productName || "Product"} x {p.quantity}
                            {index !== item.products.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>

                      <div className="order-status-controls">
                        <div className="status-control">
                          <label>Order Status</label>
                          <select
                            value={item.orderStatus || "Pending"}
                            onChange={(e) =>
                              updateOrderStatus(
                                item._id,
                                e.target.value,
                                item.paymentStatus || "Pending"
                              )
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="status-control">
                          <label>Payment Status</label>
                          <select
                            value={item.paymentStatus || "Pending"}
                            onChange={(e) =>
                              updateOrderStatus(
                                item._id,
                                item.orderStatus || "Pending",
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      className="danger-lite-btn"
                      onClick={() => deleteOrder(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="premium-panel">
              <h2>Registered Users</h2>
              <div className="list-stack">
                {users.map((item) => (
                  <div className="premium-list-row" key={item._id}>
                    <div>
                      <strong>{item.username}</strong>
                      <p>{item.email}</p>
                    </div>
                    <button
                      className="danger-lite-btn"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="premium-panel">
              <h2>Customer Messages</h2>
              <div className="list-stack">
                {contacts.map((item) => (
                  <div className="premium-list-row admin-full-row" key={item._id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.email}</p>
                      <p>{item.subject}</p>
                      <p>{item.message}</p>
                    </div>
                    <button
                      className="danger-lite-btn"
                      onClick={() => deleteContact(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;