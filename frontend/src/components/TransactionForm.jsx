import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';

const TransactionForm = () => {
  const { addTransaction, categories } = useContext(TransactionContext);
  const [transaction, setTransaction] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { transaction, amount, date, category };
    addTransaction(newTransaction);
    setTransaction('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
  <div className='formTransaction'>
       <Form onSubmit={handleSubmit} >
    <Form.Group controlId="formTransaction">
      <Form.Label>Transaction</Form.Label>
      <Form.Control 
        type="text" 
        value={transaction} 
        onChange={(e) => setTransaction(e.target.value)} 
      />
    </Form.Group>
    <Form.Group controlId="formAmount">
      <Form.Label>Montant</Form.Label>
      <Form.Control 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
    </Form.Group>
    <Form.Group controlId="formDate">
      <Form.Label>Date de Transaction</Form.Label>
      <Form.Control 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
    </Form.Group>
    <Form.Group controlId="formCategory">
      <Form.Label>Catégorie</Form.Label>
      <Form.Control 
        as="select" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
      >
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">Ajouter</Button>
  </Form> 
  </div>
  );
};

export default TransactionForm;