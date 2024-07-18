import React from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionShow from '../components/TransactionShow';

const TransactionsPage = () => {
  return (
    <div >
      <h1>Transactions</h1>
      <div className='transactionPage' >
      <TransactionShow /> 
      <TransactionForm />
       
      </div>
    </div>
  );
};

export default TransactionsPage;
