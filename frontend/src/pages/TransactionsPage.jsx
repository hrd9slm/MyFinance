import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionShow from '../components/TransactionShow';
import "../index.css";
import Home from './Home';
import Header from '../components/Header';
const TransactionsPage = () => {
  return (
    <div >
      <Header/>
      <div className='transactionPage' >
      <TransactionShow /> 
      <TransactionForm />
       
      </div>
    </div>
  );
};

export default TransactionsPage;
