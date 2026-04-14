import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
      address: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (form.password !== form.confirmPassword) {
          alert("Password and confirm password do not match");
          return;
        }

        await register({
          username: form.username,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          password: form.password,
          address: form.address,
        });

        alert("Registration successful. Please login.");
        resetForm();
        setIsRegister(false);
        navigate("/login");
        return;
      }

      const data = await login(form.email, form.password);
      navigate(data.isAdmin ? "/admin" : "/home");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="login-page-v2">
      <div className="login-page-v2__overlay" />

      <div className="login-page-v2__container">
        <div className="login-page-v2__left">
          <div className="login-badge">PETSPHERE</div>
          <h1>
            Better Care.
            <br />
            Better Products.
            <br />
            Better Shopping.
          </h1>
          <p>
            Premium food, accessories, toys, grooming essentials and wellness
            products for dogs, cats, birds and aquatic pets.
          </p>

          <div className="login-feature-grid">
            {/* <div className="login-feature-card">
              <strong>Premium Quality</strong>
              <span>Trusted product collection for daily pet care.</span>
            </div> */}
            {/* <div className="login-feature-card">
              <strong>Secure Access</strong>
              <span>User and admin login backed by your database.</span>
            </div> */}
            {/* <div className="login-feature-card">
              <strong>Fast Experience</strong>
              <span>Clean product browsing and easier order flow.</span>
            </div> */}
          </div>
        </div>

        <div className="login-page-v2__right">
          <div className="login-card-v2">
            <div className="login-card-v2__top">
              <div className="login-logo-mini">PS</div>
              <div>
                <h2>{isRegister ? "Create Account" : "Sign In"}</h2>
                <p>
                  {isRegister
                    ? "Register first, then login using your saved credentials."
                    : "Login with your registered email and password."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="login-form-v2">
              {isRegister ? (
                <>
                  <div className="auth-grid-2">
                    <input
                      type="text"
                      name="username"
                      placeholder="Full Name"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="auth-grid-2">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <textarea
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    rows="4"
                    required
                  />

                  <div className="password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div className="password-wrap">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <div className="password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </>
              )}

              <button type="submit" className="login-main-btn-v2">
                {isRegister ? "Create Account" : "Login"}
              </button>
            </form>

            <div className="login-card-v2__actions">
              <button
                type="button"
                className="login-switch-btn-v2"
                onClick={() => {
                  setIsRegister((prev) => !prev);
                  resetForm();
                }}
              >
                {isRegister ? "Back to Login" : "New User Register"}
              </button>
            </div>

            {!isRegister && (
              <div className="login-demo-box-v2">
                {/* <strong>Demo Credentials</strong>
                <p>User: user@gmail.com / user123</p>
                <p>Admin: admin@gmail.com / admin123</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginRegister;