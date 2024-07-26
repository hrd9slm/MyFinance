import React, { useContext } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { StatisticsContext } from '../context/StatisticsContext';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { statistics, loading, error } = useContext(StatisticsContext);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const {
    totalExpensesByCategory,
    totalExpensesByMonth,
    remainingBudgetByCategory,
    totalUserExpenses,
    salary,
  } = statistics;

  // Data for charts
  const expensesByCategoryData = {
    labels: totalExpensesByCategory.map(cat => cat._id),
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: totalExpensesByCategory.map(cat => cat.totalAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expensesByMonthData = {
    labels: totalExpensesByMonth.map(month => month._id),
    datasets: [
      {
        label: 'Total Expenses by Month',
        data: totalExpensesByMonth.map(month => month.totalAmount),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const remainingBudgetData = {
    labels: remainingBudgetByCategory.map(cat => cat.name),
    datasets: [
      {
        label: 'Remaining Budget by Category',
        data: remainingBudgetByCategory.map(cat => cat.remainingBudget),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalUserExpensesData = {
    labels: ['Total Expenses'],
    datasets: [
      {
        label: 'Total User Expenses',
        data: [totalUserExpenses.totalAmount],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Salary and Budget by Month
  const salaryAndBudgetData = {
    labels: totalExpensesByMonth.map(month => month._id),
    datasets: [
      {
        label: 'Salary',
        data: totalExpensesByMonth.map(() => salary),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        stack: 'stack0',
      },
      ...remainingBudgetByCategory.map((cat, index) => ({
        label: cat.name,
        data: totalExpensesByMonth.map(() => cat.remainingBudget),
        backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.5)`,
        borderColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`,
        stack: 'stack1',
      })),
    ],
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><a href="#expenses-by-category">Expenses by Category</a></li>
          <li><a href="#expenses-by-month">Expenses by Month</a></li>
          <li><a href="#remaining-budget">Remaining Budget</a></li>
          <li><a href="#user-expenses">Total User Expenses</a></li>
          <li><a href="#salary-and-budget">Salary and Budget by Month</a></li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="charts">
          <div id="expenses-by-category" className="chart-container">
            <h2>Total Expenses by Category</h2>
            <Bar data={expensesByCategoryData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div id="expenses-by-month" className="chart-container">
            <h2>Total Expenses by Month</h2>
            <Line data={expensesByMonthData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div id="remaining-budget" className="chart-container">
            <h2>Remaining Budget by Category</h2>
            <Pie data={remainingBudgetData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div id="user-expenses" className="chart-container">
            <h2>Total User Expenses</h2>
            <Bar data={totalUserExpensesData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>

          <div id="salary-and-budget" className="chart-container">
            <h2>Salary and Budget by Month</h2>
            <Bar data={salaryAndBudgetData} options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
