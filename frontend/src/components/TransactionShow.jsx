import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBill, FaMoneyCheckAlt, FaCalendarAlt } from 'react-icons/fa';

const TransactionShow = () => {
  const { remainingBudget, categories } = useContext(TransactionContext);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="transactionShow">
      <h2>Mois: {currentMonth}</h2>
      <h3>Montant restant: {remainingBudget} DH</h3>
 
      
          {/* Section droite pour afficher les catégories */}
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
