import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionShow from '../components/TransactionShow';
import "../index.css";
const TransactionsPage = () => {
  return (
    <div >
      <h1>MY Transactions</h1>
      <div className='transactionPage' >
      <TransactionShow /> 
      <TransactionForm />
       
      </div>
    </div>
  );
};

export default TransactionsPage;
