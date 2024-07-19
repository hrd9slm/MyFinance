import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBill, FaMoneyCheckAlt, FaCalendarAlt } from 'react-icons/fa';

const TransactionShow = () => {
  const { remainingBudget, categories,auth } = useContext(TransactionContext);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const salary=auth.user.salary;

  return (
    <div className="transactionShow">
    <div className="header">
        <h4>Mois: {currentMonth}</h4>
        <h5>Montant restant: {salary} DH</h5>
      </div>
          {categories.map(category => (
            <Card key={category._id} className="mb-3">
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                <FaMoneyBill className="icon" /> Budget: {category.budget} DH<br />
  <FaMoneyCheckAlt className="icon" /> Budget restant: {category.remainingBudget} DH<br />
  <FaCalendarAlt className="icon" /> Dernière transaction: {category.lastTransactionDate
    ? new Date(category.lastTransactionDate).toLocaleDateString()
    : 'N/A'}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
       
      
      

    </div>
  );
};

export default TransactionShow;
