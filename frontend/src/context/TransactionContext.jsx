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
  const [remainingSalary, setRemainingSalary] = useState(0);


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
  useEffect(() => {
    if (auth.user) {
      setRemainingSalary(auth.user.remainingSalary); 
    }
  }, [auth.user]);

  const addTransaction = async (transaction) => {
    try {
      const response = await axiosInstance.post('/transactions', transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const response = await axiosInstance.put(`/transactions/${id}`, updatedTransaction);
      setTransactions(transactions.map(transaction => 
        transaction._id === id ? response.data : transaction
      ));
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <TransactionContext.Provider value={{ transactions, categories, addTransaction,remainingSalary,auth,deleteTransaction,updateTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
