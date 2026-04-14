import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalCartQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="new-header">
      <div className="container new-header-inner">
        <Link to={user?.isAdmin ? "/admin" : "/home"} className="new-brand">
          <div className="new-brand-logo">PS</div>
          <div>
            <h2>PetSphere</h2>
            <p>Premium Pet Store</p>
          </div>
        </Link>

        {!user?.isAdmin ? (
          <nav className="new-nav">
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart" className="header-cart-pill">
              Cart <span>{totalCartQty}</span>
            </Link>
          </nav>
        ) : (
          <nav className="new-nav">
            <Link to="/admin">Dashboard</Link>
          </nav>
        )}

        <div className="new-header-right">
          <div className="header-user-box">
            <small>Signed in as</small>
            <strong>{user?.username || "Admin"}</strong>
          </div>
          <button className="header-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;