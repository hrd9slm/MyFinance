import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBill, FaMoneyCheckAlt, FaCalendarAlt } from 'react-icons/fa';

const TransactionShow = () => {
  const { remainingBudget, categories,remainingSalary ,transactions } = useContext(TransactionContext);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });


   const getLastTransactionDate = (categoryId) => {
  
      const categoryTransactions =  transactions.filter(transaction => transaction.category === categoryId);
     if (categoryTransactions.length === 0) return 'N/A';
     const lastTransaction = categoryTransactions.reduce((latest, transaction) => {
       const transactionDate = new Date(transaction.date);
       return transactionDate > latest ? transactionDate : latest;
     }, new Date(0));
     return lastTransaction.toLocaleDateString();

   };

  return (
    <div className="transactionShow">
    <div className="header">
        <h4>Mois: {currentMonth}</h4>
        <h5>Montant restant: {remainingSalary} DH</h5>
      </div>
          {categories.map(category => (
            <Card key={category._id} className="mb-3">
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                <FaMoneyBill className="icon" /> Budget: {category.budget} DH<br />
  <FaMoneyCheckAlt className="icon" /> Budget restant: {category.remainingBudget} DH<br />
   <FaCalendarAlt className="icon" /> Dernière transaction:{getLastTransactionDate(category._id)} 
 
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      
    </div>

    
  );
};

export default TransactionShow;
