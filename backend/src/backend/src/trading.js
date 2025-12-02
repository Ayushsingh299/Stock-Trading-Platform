import { pool } from "./db.js";

export async function getPortfolio(req, res) {
  try {
    const userId = req.userId;

    const portfolioRes = await pool.query(
      "SELECT cash FROM portfolios WHERE user_id=$1",
      [userId]
    );

    const positionsRes = await pool.query(
      "SELECT symbol, quantity, avg_price FROM positions WHERE user_id=$1 ORDER BY symbol",
      [userId]
    );

    if (portfolioRes.rows.length === 0) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json({
      cash: parseFloat(portfolioRes.rows[0].cash || 0),
      positions: positionsRes.rows.map(p => ({
        symbol: p.symbol,
        quantity: parseFloat(p.quantity),
        avgPrice: parseFloat(p.avg_price)
      }))
    });
  } catch (err) {
    console.error("Portfolio error:", err);
    res.status(500).json({ message: "Error loading portfolio" });
  }
}

export async function placeOrder(req, res) {
  try {
    const userId = req.userId;
    const { symbol, side, quantity, type } = req.body;

    const qty = Number(quantity);
    if (!symbol || !side || !qty || !type) {
      return res.status(400).json({ message: "Missing required fields: symbol, side, quantity, type" });
    }

    if (qty <= 0) {
      return res.status(400).json({ message: "Quantity must be positive" });
    }

    if (!["BUY", "SELL"].includes(side)) {
      return res.status(400).json({ message: "Side must be BUY or SELL" });
    }

    const price = 100 + Math.random() * 150;

    await pool.query("BEGIN");

    const portfolioRes = await pool.query(
      "SELECT cash FROM portfolios WHERE user_id=$1 FOR UPDATE",
      [userId]
    );

    if (portfolioRes.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const cash = Number(portfolioRes.rows[0].cash);
    const cost = price * qty;

    if (side === "BUY") {
      if (cash < cost) {
        await pool.query("ROLLBACK");
        return res.status(400).json({ 
          message: "Insufficient cash", 
          required: cost.toFixed(2),
          available: cash.toFixed(2)
        });
      }

      const posRes = await pool.query(
        "SELECT id, quantity, avg_price FROM positions WHERE user_id=$1 AND symbol=$2 FOR UPDATE",
        [userId, symbol]
      );

      if (posRes.rows.length === 0) {
        await pool.query(
          "INSERT INTO positions (user_id, symbol, quantity, avg_price) VALUES ($1,$2,$3,$4)",
          [userId, symbol, qty, price]
        );
      } else {
        const pos = posRes.rows[0];
        const newQty = Number(pos.quantity) + qty;
        const newAvg = (Number(pos.avg_price) * Number(pos.quantity) + price * qty) / newQty;

        await pool.query(
          "UPDATE positions SET quantity=$1, avg_price=$2 WHERE id=$3",
          [newQty, newAvg, pos.id]
        );
      }

      await pool.query(
        "UPDATE portfolios SET cash=$1 WHERE user_id=$2",
        [cash - cost, userId]
      );
    } else if (side === "SELL") {
      const posRes = await pool.query(
        "SELECT id, quantity, avg_price FROM positions WHERE user_id=$1 AND symbol=$2 FOR UPDATE",
        [userId, symbol]
      );

      if (posRes.rows.length === 0 || Number(posRes.rows[0].quantity) < qty) {
        await pool.query("ROLLBACK");
        return res.status(400).json({ message: "Not enough quantity to sell" });
      }

      const pos = posRes.rows[0];
      const newQty = Number(pos.quantity) - qty;

      if (newQty === 0) {
        await pool.query("DELETE FROM positions WHERE id=$1", [pos.id]);
      } else {
        await pool.query("UPDATE positions SET quantity=$1 WHERE id=$2", [newQty, pos.id]);
      }

      await pool.query(
        "UPDATE portfolios SET cash=$1 WHERE user_id=$2",
        [cash + cost, userId]
      );
    }

    const orderRes = await pool.query(
      "INSERT INTO orders (user_id, symbol, side, quantity, price, type, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, symbol, side, quantity, price, type, status, created_at",
      [userId, symbol, side, qty, price, type, "FILLED"]
    );

    await pool.query("COMMIT");
    res.status(201).json(orderRes.rows[0]);
  } catch (err) {
    console.error("Order error:", err);
    try {
      await pool.query("ROLLBACK");
    } catch (e) {}
    res.status(500).json({ message: "Error placing order" });
  }
}

export async function getOrders(req, res) {
  try {
    const userId = req.userId;

    const ordersRes = await pool.query(
      "SELECT id, symbol, side, quantity, price, type, status, created_at FROM orders WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100",
      [userId]
    );

    res.json(ordersRes.rows);
  } catch (err) {
    console.error("Orders error:", err);
    res.status(500).json({ message: "Error loading orders" });
  }
}
