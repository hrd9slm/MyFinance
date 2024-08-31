import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionShow from '../components/TransactionShow';
import "../index.css";
import Home from './Home';
const TransactionsPage = () => {
  return (
    <div >
      <Home/>
    
      <div className='transactionPage' >
      <TransactionShow /> 
      <TransactionForm />
       
      </div>
    </div>
  );
};

export default TransactionsPage;
