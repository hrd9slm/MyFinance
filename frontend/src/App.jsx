import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { TransactionProvider } from "./context/TransactionContext";
 import './index.css'

const App = () => {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
};

export default App;
