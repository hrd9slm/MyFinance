import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionContext = createContext();
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false); // Marque le chargement comme terminé une fois que toutes les données sont chargées
      }
    };

    fetchTransactions();
    fetchCategories();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axiosInstance.post('/transactions', transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement tant que les données sont en cours de chargement
  }

  return (
    <TransactionContext.Provider value={{ transactions, categories, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
