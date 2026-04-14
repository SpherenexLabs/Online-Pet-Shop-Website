import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2200,
            style: {
              borderRadius: "14px",
              background: "#113f39",
              color: "#fff",
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);