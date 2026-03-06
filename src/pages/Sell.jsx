import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sell = () => {
  const navigate = useNavigate();
  const { user, becomeSeller } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Become a Seller</h1>
          <p style={styles.subtitle}>You need to log in first to become a seller.</p>
          <button onClick={() => navigate("/login")} style={styles.button}>Go to Login</button>
        </div>
      </div>
    );
  }

  if (user.role === "vendor") {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>You're already a seller!</h1>
          <p style={styles.subtitle}>Go to your dashboard to manage your store.</p>
          <button onClick={() => navigate("/seller/dashboard")} style={styles.button}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  const handleBecomeSeller = async () => {
    if (!storeName) return alert("Store name required");
    setLoading(true);
    setError("");
    try {
      await becomeSeller(storeName, description);
      navigate("/seller/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Start Your Store on Artisan's Corner</h1>
        <p style={styles.subtitle}>
          Turn your handmade creations into a thriving online business.
        </p>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Enter Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Short Store Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <button onClick={handleBecomeSeller} style={styles.button} disabled={loading}>
             {loading ? "Creating..." : "Create My Store"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    padding: "20px",
  },
  card: {
    width: "400px",
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    resize: "none",
    height: "80px",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Sell;