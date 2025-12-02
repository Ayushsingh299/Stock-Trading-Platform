import dotenv from "dotenv";

dotenv.config();

const mockPrices = {
  "INFY": 1950.50,
  "TCS": 4050.25,
  "RELIANCE": 2650.75,
  "HDFC": 2850.00,
  "WIPRO": 1100.50,
  "LT": 3200.00,
  "AAPL": 230.50,
  "GOOGL": 180.25,
  "MSFT": 420.75,
  "AMZN": 190.30,
  "TESLA": 280.75,
  "META": 520.25
};

export async function getQuote(req, res) {
  try {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ message: "symbol required" });

    const upperSymbol = symbol.toUpperCase();
    const basePrice = mockPrices[upperSymbol] || (100 + Math.random() * 200);
    const randomChange = (Math.random() - 0.5) * 20;
    const price = Math.max(basePrice + randomChange, 10);
    const changePercent = ((randomChange / basePrice) * 100).toFixed(2);

    res.json({
      symbol: upperSymbol,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(randomChange.toFixed(2)),
      changePercent: `${changePercent}%`,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Quote error:", err);
    res.status(500).json({ message: "Error fetching quote" });
  }
}
