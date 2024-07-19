import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import LoginPage from './pages/LoginPage';
import "bootstrap/dist/css/bootstrap.min.css";
import { TransactionProvider } from "./context/TransactionContext";
import Register from './components/Register';
import User from './components/User';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
         <AuthProvider>
    <TransactionProvider>
      
        <Routes>
        <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/user" element={<User />} />
        </Routes>
     
    </TransactionProvider>
    </AuthProvider>
    </Router>
 
  );
 
};

export default App;