import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login, authMiddleware } from "./auth.js";
import { getQuote } from "./market.js";
import { getPortfolio, placeOrder, getOrders } from "./trading.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date(),
    service: "ProTrade Trading Platform Backend"
  });
});

// Auth routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// Market data
app.get("/api/market/quote", authMiddleware, getQuote);

// Trading routes
app.get("/api/portfolio", authMiddleware, getPortfolio);
app.post("/api/orders", authMiddleware, placeOrder);
app.get("/api/orders", authMiddleware, getOrders);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 CORS enabled for http://localhost:5173\n`);
});
