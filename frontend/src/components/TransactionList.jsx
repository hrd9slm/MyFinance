import React, { useContext, useState } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBill, FaCalendarAlt, FaEdit, FaTrash, FaTag } from 'react-icons/fa';

const TransactionList = () => {
  const { transactions, deleteTransaction, updateTransaction, categories } = useContext(TransactionContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [transactionId, setTransactionId] = useState(null);

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleEdit = (transaction) => {
    setTransactionId(transaction._id);
    setEditData({
      amount: transaction.amount,
      date: transaction.date.slice(0, 10), // Formatting date to yyyy-mm-dd
      category: transaction.category,
      description: transaction.description
    });
    setShowModal(true);
  };

  const handleUpdate = () => {
    updateTransaction(transactionId, editData);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="transactionList">
      <Row>
        {transactions.map(transaction => (
          <Col key={transaction._id} xs={12} md={4} lg={4} className="mb-3">
            <Card style={{ backgroundColor: '#f8f9fa', borderColor: '#e9ecef' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Card.Title>{transaction.description}</Card.Title>
                  <div className="icon-container">
                    <Button variant="link" onClick={() => handleEdit(transaction)} className="edit-button">
                      <FaEdit className="icon" style={{ color: 'green' }} />
                    </Button>
                    <Button variant="link" onClick={() => handleDelete(transaction._id)} className="delete-button">
                      <FaTrash className="icon" style={{ color: 'red' }} />
                    </Button>
                  </div>
                </div>
                <Card.Text>
                  <FaMoneyBill className="icon" /> Montant: {transaction.amount} DH<br />
                  <FaCalendarAlt className="icon" /> Date: {new Date(transaction.date).toLocaleDateString()}<br />
                  <FaTag className="icon" /> Catégorie: {categories.find(cat => cat._id === transaction.category)?.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for editing transaction */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={editData.amount || ''}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editData.date || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editData.category || ''}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editData.description || ''}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionList;
