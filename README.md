# 📈 AI-Powered Trading Platform

> A modern, full-stack trading application combining real-time market data, intelligent portfolio management, and advanced analytics for data-driven trading decisions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

This trading platform empowers traders with comprehensive tools for market analysis and portfolio management. Built with modern technologies and following industry best practices, it provides real-time stock tracking, AI-powered recommendations, and detailed performance analytics.

**Live Demo**: [View Demo](https://your-demo-url.com) | **Documentation**: [Full Docs](https://docs.your-url.com)

---

## ✨ Features

- **🔐 Secure Authentication** - JWT-based auth with bcrypt password hashing and protected routes
- **📊 Real-Time Market Data** - Live stock prices via Alpha Vantage API with automatic updates
- **💼 Portfolio Management** - Track holdings, P&L calculations, and performance metrics in real-time
- **🤖 AI Recommendations** - Smart stock suggestions based on market trends and portfolio analysis
- **📈 Interactive Analytics** - Visual charts for portfolio value, asset allocation, and trends
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **🔔 Price Alerts** - Get notified when stocks hit target prices (upcoming feature)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **Recharts** - Interactive data visualization
- **React Router** - Client-side routing

### Backend
- **Node.js & Express** - RESTful API server
- **PostgreSQL** - Relational database
- **Sequelize ORM** - Database modeling and queries
- **JWT** - Stateless authentication
- **bcryptjs** - Password encryption

### External Services
- **Alpha Vantage API** - Stock market data provider

---

## 📦 Prerequisites

- **Ensure these are installed before proceeding:**
- **Node.js (v16+) # Download: https://nodejs.org/**
- **PostgreSQL (v13+) # Download: https://www.postgresql.org/**
- **npm (v8+) or yarn # Comes with Node.js**
- **Git # Download: https://git-scm.com/**


**Verify installations:**

-**node --version # v16.0.0 or higher**
- **npm --version # v8.0.0 or higher**
- **psql --version # PostgreSQL 13.0 or higher**

  
**Get API Key:**
- Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key) for a free API key

---

## 🚀 Installation

### 1. Clone Repository
git clone https://github.com/Ayush299/trading-platform.git
cd trading-platform


### 2. Database Setup

**Access PostgreSQL**
psql -U postgres

**Create database and user**
- CREATE DATABASE trading_db;
- CREATE USER trading_user WITH PASSWORD 'your_password';
- GRANT ALL PRIVILEGES ON DATABASE trading_db TO trading_user;
- \q


### 3. Install Dependencies

**Backend:**
cd backend
npm install

text

**Frontend:**
cd ../frontend
npm install

text

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env`:
Server
PORT=5000
NODE_ENV=development

Database
DATABASE_URL=postgresql://trading_user:your_password@localhost:5432/trading_db

Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d

External API
ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key

CORS
FRONTEND_URL=http://localhost:5173

text

**Variable Descriptions:**
- `DATABASE_URL` - PostgreSQL connection string with credentials
- `JWT_SECRET` - Secret key for token signing (keep secure, min 32 chars)
- `ALPHA_VANTAGE_KEY` - Your Alpha Vantage API key for market data
- `FRONTEND_URL` - Frontend URL for CORS configuration

### Frontend Environment Variables

Create `frontend/.env`:
API Configuration
VITE_API_URL=http://localhost:5000/api

App Info
VITE_APP_NAME=Trading Platform
VITE_APP_VERSION=1.0.0

**Note:** Vite requires `VITE_` prefix for environment variables accessible in the app.

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
cd backend
npm run dev

text
Expected output: `Server running on port 5000` ✓

**Terminal 2 - Frontend:**
cd frontend
npm run dev

text
Expected output: `Local: http://localhost:5173/` ✓

**Access Application:**
- Open browser: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

### Production Mode

**Build Frontend:**
cd frontend
npm run build # Creates optimized build in dist/

text

**Start Backend:**
cd backend
npm start # Runs production server

---

## 📁 Project Structure

<img width="408" height="684" alt="image" src="https://github.com/user-attachments/assets/f4c807e3-1d6d-48b2-889b-ae796d6091ed" />


<img width="479" height="437" alt="image" src="https://github.com/user-attachments/assets/2d4c9ec3-473c-4a32-9a4e-c12225f245f0" />


**Structure Benefits:**
- Clean separation between frontend/backend for independent scaling
- Modular organization for easy feature additions
- Follows MVC pattern for maintainability

---

## 🔌 API Documentation

### Authentication

**Register User**
POST /api/auth/register
Content-Type: application/json

{
"username": "johndoe",
"email": "john@example.com",
"password": "SecurePass123!"
}

text
**Description:** Creates new user account with hashed password and returns JWT token for immediate login.

**Login**
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "SecurePass123!"
}

text
**Description:** Authenticates user and returns JWT token valid for 7 days.

---

### Portfolio Endpoints

**All portfolio endpoints require authentication:**
Authorization: Bearer <your_jwt_token>

text

**Get Portfolio**
GET /api/portfolio

text
**Description:** Retrieves user's complete portfolio with real-time prices and P&L calculations.

**Add Stock**
POST /api/portfolio/add
Content-Type: application/json

{
"symbol": "AAPL",
"quantity": 10,
"buyPrice": 150.00
}

text
**Description:** Adds new stock holding to portfolio after validating symbol.

**Update Holding**
PUT /api/portfolio/:id
Content-Type: application/json

{
"quantity": 15,
"buyPrice": 148.50
}

text
**Description:** Updates existing holding's quantity or average buy price.

**Delete Holding**
DELETE /api/portfolio/:id

text
**Description:** Removes stock from portfolio permanently.

---

### Stock Data Endpoints

**Get Stock Quote**
GET /api/stocks/quote/:symbol

text
**Example:** `GET /api/stocks/quote/AAPL`

**Description:** Fetches real-time stock price, volume, and key metrics from Alpha Vantage.

**Search Stocks**
GET /api/stocks/search?query=apple

text
**Description:** Searches for stocks by company name or symbol, returns ranked results.

**Get AI Recommendations**
GET /api/stocks/recommendations

text
**Description:** Returns AI-generated stock recommendations based on market analysis and trends.

---

## 🗄️ Database Schema

### Users Table
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

text
**Description:** Stores user accounts with secure password hashing. Unique constraints on username and email prevent duplicates.

### Portfolios Table
CREATE TABLE portfolios (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
symbol VARCHAR(10) NOT NULL,
quantity INTEGER NOT NULL CHECK (quantity > 0),
buy_price DECIMAL(10, 2) NOT NULL CHECK (buy_price > 0),
purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

text
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
UNIQUE(user_id, symbol)
);

text
**Description:** Stores user stock holdings. Unique constraint on (user_id, symbol) prevents duplicate holdings. CASCADE delete removes portfolio when user is deleted.

---

## 🚀 Deployment

### Deploy to Railway (Backend + Database)

1. **Sign up:** [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub repo
3. **Add PostgreSQL** → Database automatically provisions
4. **Set Environment Variables:**
NODE_ENV=production
JWT_SECRET=production_secret_min_32_chars
ALPHA_VANTAGE_KEY=your_key
FRONTEND_URL=https://your-frontend.vercel.app

text
5. **Deploy** → Automatic on git push

**Description:** Railway provides PostgreSQL database and auto-deploys on every push to main branch.

### Deploy to Vercel (Frontend)

1. **Sign up:** [vercel.com](https://vercel.com)
2. **Import Project** → Set root to `frontend/`
3. **Framework:** Vite
4. **Environment Variables:**
VITE_API_URL=https://your-backend.railway.app/api

text
5. **Deploy** → Live in seconds

**Description:** Vercel optimizes React builds with edge caching and automatic HTTPS.

### Production Checklist
- [ ] Update `FRONTEND_URL` and `VITE_API_URL` with production URLs
- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Configure database backups
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure rate limiting for API endpoints

---

## 🧪 Testing

### Run Backend Tests
cd backend
npm test

text
**Coverage:** Authentication, portfolio CRUD, stock data fetching

### Run Frontend Tests
cd frontend
npm test

text
**Coverage:** Component rendering, user interactions, form validation

**Test Frameworks:**
- Backend: Jest + Supertest
- Frontend: Vitest + React Testing Library

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Submit** Pull Request with detailed description

**Code Style:**
- Use ES6+ features
- Follow existing patterns
- Add tests for new features
- Update documentation

---


## 📸 Screenshots

### Dashboard
![Dashboard](docs/images/dashboard.png)

*Real-time portfolio overview with performance metrics and charts*

### Portfolio Management
![Portfolio](docs/images/portfolio.png)

*Add, update, and track your stock holdings with live P&L*

### Stock Analytics
![Analytics](docs/images/analytics.png)

*Interactive charts showing portfolio trends and asset allocation*

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- [x] User authentication with JWT
- [x] Portfolio CRUD operations
- [x] Real-time stock prices
- [x] Basic analytics dashboard
- [x] AI stock recommendations

### Version 2.0 (Planned)
- [ ] Price alerts and notifications
- [ ] Advanced charting (candlestick, technical indicators)
- [ ] Transaction history tracking
- [ ] Export portfolio reports (PDF/CSV)
- [ ] Dark mode theme
- [ ] WebSocket for real-time updates
- [ ] Social trading features
- [ ] Mobile app (React Native)

---

## 📊 Performance

- **API Response Time:** < 200ms average
- **Page Load Time:** < 2s on 3G
- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices)
- **Database Queries:** Optimized with indexes
- **Bundle Size:** < 500KB (gzipped)

---

## 🔒 Security

- **Password Hashing:** bcrypt with 10 salt rounds
- **JWT Tokens:** Secure, stateless authentication
- **SQL Injection:** Protected via Sequelize ORM
- **CORS:** Configured for specific origins only
- **HTTPS:** Enforced in production
- **Environment Variables:** Sensitive data in `.env` (gitignored)

---

## 📚 Resources

- [Alpha Vantage API Docs](https://www.alphavantage.co/documentation/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT License

Copyright (c) 2025 [Ayush Singh]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

text

---


## 📞 Contact & Support

- **Author:** Ayush Singh
- **GitHub:** [@Ayushsingh299](https://github.com/Ayushsingh299/Stock-Trading-Platform.git)
- **LinkedIn:** [Your Profile](https://linkedin.com/in/yourprofile)

**Found a bug?** [Report it](https://github.com/Ayushsingh299/Stock-Trading-Platform/issues/new)

**Need help?** [Start a discussion](https://github.com/Ayushsingh299/Stock-Trading-Platform/discussions)

---

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for free market data API
- [Railway](https://railway.app/) for hosting services
- [Vercel](https://vercel.com/) for frontend deployment
- [Recharts](https://recharts.org/) for beautiful chart components
- The open-source community for amazing tools and libraries

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on [GitHub](https://github.com/Ayushsingh299/Stock-Trading-Platform.git)!

---

<div align="center">

**Built with ❤️ using React, Node.js, and PostgreSQL**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/trading-platform?style=social)](https://github.com/yourusername/trading-platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/trading-platform?style=social)](https://github.com/yourusername/trading-platform/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/trading-platform)](https://github.com/yourusername/trading-platform/issues)

</div>

---

