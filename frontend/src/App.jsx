import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { TransactionProvider } from "./context/TransactionContext";
import Register from "./components/Register";
import User from "./components/User";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import TransactionsListPage from "./pages/TransactionsListPage";
import Dashboard from "./components/Dashboard";
import StatisticsProvider from "./context/StatisticsContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          <StatisticsProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/user" element={<User />} />
            <Route path="/TransactionList" element={<TransactionsListPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          </StatisticsProvider>
        </TransactionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
