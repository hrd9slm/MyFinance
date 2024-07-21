import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Chemin vers le fichier axiosInstance.js

export const StatisticsContext = createContext();

const StatisticsProvider = ({ children }) => {
  const [statistics, setStatistics] = useState({
    totalExpensesByCategory: [],
    totalExpensesByMonth: [],
    remainingBudgetByCategory: [],
    totalUserExpenses: { totalAmount: 0 },
    salary: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const [expensesByCategory, expensesByMonth, budgetByCategory, userExpenses] = await Promise.all([
        axiosInstance.get('stats/total-expenses-by-category'),
        axiosInstance.get('/stats/total-expenses-by-month'),
        axiosInstance.get('stats/remaining-budget-by-category'),
        axiosInstance.get('stats/total-user-expenses'),
      ]);

      setStatistics({
        totalExpensesByCategory: expensesByCategory.data.totalExpensesByCategory,
        totalExpensesByMonth: expensesByMonth.data.totalExpensesByMonth,
        remainingBudgetByCategory: budgetByCategory.data.remainingBudgetByCategory,
        totalUserExpenses: userExpenses.data.totalUserExpenses,
        salary: userExpenses.data.salary,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ statistics, loading, error, fetchStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;
