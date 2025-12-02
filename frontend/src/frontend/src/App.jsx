import React, { useState, useEffect } from "react";
import api, { setToken } from "./api";

function LoginPage({ onLoggedIn }) {
  const [email, setEmail] = useState("demo@user.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const res = await api.post(endpoint, { email, password });
      const token = res.data.token;

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);
      onLoggedIn();
    } catch (err) {
      setError(err.response?.data?.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>📈 ProTrade</h1>
          <p>Professional Stock Trading Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Processing..." : isRegister ? "Create Account" : "Login"}
          </button>

          <div className="toggle-auth">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="link-button"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </div>
        </form>

        <div className="demo-info">
          <p>Demo Credentials:</p>
          <p>Email: demo@user.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [portfolio, setPortfolio] = useState({ cash: 0, positions: [] });
  const [orders, setOrders] = useState([]);
  const [symbol, setSymbol] = useState("INFY");
  const [quote, setQuote] = useState(null);
  const [quantity, setQuantity] = useState(10);
  const [side, setSide] = useState("BUY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPortfolio = async () => {
    try {
      const res = await api.get("/portfolio");
      setPortfolio(res.data);
    } catch (err) {
      setError("Failed to load portfolio");
    }
  };

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders");
    }
  };

  const loadQuote = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/market/quote", { params: { symbol } });
      setQuote(res.data);
    } catch (err) {
      setError("Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.post("/orders", {
        symbol: symbol.toUpperCase(),
        side,
        quantity: Number(quantity),
        type: "MARKET"
      });

      setSuccess(`${side} order placed for ${quantity} ${symbol} shares!`);
      await loadPortfolio();
      await loadOrders();
      setQuantity(10);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  useEffect(() => {
    loadPortfolio();
    loadOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>📈 ProTrade Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="cash-display">
            <span className="label">Available Cash:</span>
            <span className="amount">₹{Number(portfolio.cash).toFixed(2)}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Quote Section */}
        <section className="panel quote-panel">
          <h3>📊 Stock Quote</h3>
          <div className="quote-form">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol"
              maxLength="10"
            />
            <button onClick={loadQuote} disabled={loading} className="btn-primary">
              {loading ? "Loading..." : "Get Quote"}
            </button>
          </div>

          {quote && (
            <div className="quote-display">
              <div className="quote-row">
                <span className="label">Symbol:</span>
                <span className="value">{quote.symbol}</span>
              </div>
              <div className="quote-row price-row">
                <span className="label">Price:</span>
                <span className="value price">₹{quote.price.toFixed(2)}</span>
              </div>
              <div className="quote-row change-row">
                <span className="label">Change:</span>
                <span className={`value ${quote.change > 0 ? 'positive' : 'negative'}`}>
                  {quote.change > 0 ? '+' : ''}{quote.change.toFixed(2)} ({quote.changePercent})
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Order Form Section */}
        <section className="panel order-panel">
          <h3>🛒 Place Order</h3>
          <form onSubmit={submitOrder} className="order-form">
            <div className="form-group">
              <label>Symbol</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="INFY"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Action</label>
              <select value={side} onChange={(e) => setSide(e.target.value)} required>
                <option value="BUY">🔵 BUY</option>
                <option value="SELL">🔴 SELL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                max="10000"
                required
              />
            </div>

            {error && <div className="error-box">{error}</div>}
            {success && <div className="success-box">{success}</div>}

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? "Processing..." : `Place ${side} Order`}
            </button>
          </form>
        </section>

        {/* Positions Section */}
        <section className="panel positions-panel">
          <h3>📍 Your Positions</h3>
          {portfolio.positions.length === 0 ? (
            <div className="empty-state">No positions yet</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.positions.map((pos) => (
                  <tr key={pos.symbol}>
                    <td className="symbol">{pos.symbol}</td>
                    <td className="qty">{pos.quantity}</td>
                    <td className="price">₹{Number(pos.avgPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Recent Orders Section */}
        <section className="panel orders-panel">
          <h3>📋 Recent Orders</h3>
          {orders.length === 0 ? (
            <div className="empty-state">No orders yet</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Symbol</th>
                  <th>Action</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="time">{new Date(order.created_at).toLocaleTimeString()}</td>
                    <td className="symbol">{order.symbol}</td>
                    <td className={`action ${order.side.toLowerCase()}`}>
                      {order.side === "BUY" ? "🔵 BUY" : "🔴 SELL"}
                    </td>
                    <td className="qty">{order.quantity}</td>
                    <td className="price">₹{Number(order.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="app">
      {loggedIn ? <Dashboard /> : <LoginPage onLoggedIn={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
