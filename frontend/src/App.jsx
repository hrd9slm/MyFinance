import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { TransactionProvider } from "./context/TransactionContext";
 import './index.css'
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
    <TransactionProvider>
      <Router>
        <Routes>
        <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Router>
    </TransactionProvider>
    </AuthProvider>
  );
 
};

export default App;