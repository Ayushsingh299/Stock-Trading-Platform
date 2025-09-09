# 🏦 Stock Trading Platform 

A **basic stock trading simulator** written in Java.  It simulates a small market with randomly fluctuating stock prices, allows users to **buy/sell stocks**, track their **portfolio performance**, and persists data between sessions using file storage.

---

## ✨ Features

- 📈 **Market Simulation**
  - Random walk stock price updates (`tick`).
  - Display live market snapshots with symbol, price, and company name.

- 💰 **Trading Operations**
  - Buy and sell stocks with automatic transaction validation.
  - Realistic portfolio updates with cash balance management.

- 📊 **Portfolio Management**
  - Track holdings, portfolio value, and cash balance.
  - View detailed breakdown of owned stocks.

- 🧾 **Transaction History**
  - Each buy/sell is logged with timestamp and unique ID.

- 👥 **Multi-user Support**
  - Register and login with different accounts.
  - Each user has their own portfolio and cash balance.

- 💾 **Persistence**
  - User data (cash, holdings, history) is stored in `users.dat`.
  - Automatically loaded on startup.

---

## 🛠️ Technologies Used

- **Java SE** (standard library only, no external dependencies).
- **Object-Oriented Programming (OOP)** concepts:
  - `Stock`, `Market`, `User`, `Portfolio`, `Transaction`, `Storage`.
- **File I/O** (serialization with `ObjectOutputStream` / `ObjectInputStream`).

---

## 🚀 Getting Started

### Prerequisites
- Install [Java JDK](https://www.oracle.com/java/technologies/downloads/) (version 8 or higher).
- Add `javac` and `java` to your system PATH.

### Compilation
Open **Command Prompt (Windows)** or **Terminal**, navigate to the project folder and run:
javac StockTradingSystem.java

📖 Usage:-

--- Authentication ---
1) Login
2) Register
3) List users
4) Quit
   
--- Main Menu---
1) Show market snapshot
2) Advance market (tick)
3) Buy stock
4) Sell stock
5) View portfolio
6) Transaction history
7) Save / Persist
8) Logout






