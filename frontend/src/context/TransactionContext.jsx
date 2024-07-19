import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TransactionContext = createContext();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const TransactionProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ajouter un intercepteur pour inclure le token dans les en-têtes de chaque requête
  axiosInstance.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers['Authorization'] = `Bearer ${auth.token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

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
        setIsLoading(false); 
      }
    };

    fetchTransactions();
    fetchCategories();
  }, [auth.token]); 

  const addTransaction = async (transaction) => {
    try {
      const response = await axiosInstance.post('/transactions', transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <TransactionContext.Provider value={{ transactions, categories, addTransaction,auth }}>
      {children}
    </TransactionContext.Provider>
  );
};
