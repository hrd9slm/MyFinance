import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionShow from '../components/TransactionShow';
import "../index.css";
import Home from './Home';
const TransactionsPage = () => {
  return (
    <div >
      <Home/>
      <h1>MY Transactions</h1>
      <div className='transactionPage' >
      <TransactionShow /> 
      <TransactionForm />
       
      </div>
    </div>
  );
};

export default TransactionsPage;
