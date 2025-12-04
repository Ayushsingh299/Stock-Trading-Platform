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

