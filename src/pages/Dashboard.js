import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaChartPie, FaExchangeAlt } from 'react-icons/fa';
import { getDashboardStats } from '../services/api';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netSavings: 0,
    incomeByCategory: {},
    expenseByCategory: {},
    transactions: [],
    last10Incomes: [],
    last10Expenses: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getDashboardStats(token);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const incomeData = {
    labels: Object.keys(stats.incomeByCategory),
    datasets: [
      {
        data: Object.values(stats.incomeByCategory),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const expenseData = {
    labels: Object.keys(stats.expenseByCategory),
    datasets: [
      {
        data: Object.values(stats.expenseByCategory),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const currentStatusData = {
    labels: ['Total Income', 'Total Expense', 'Net Savings'],
    datasets: [
      {
        data: [stats.totalIncome, stats.totalExpense, stats.netSavings],
        backgroundColor: ['#8884d8', '#ff6347', '#82ca9d'],
        hoverBackgroundColor: ['#8884d8', '#ff6347', '#82ca9d'],
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Total Income</h3>
            <p className="text-2xl">₹{stats.totalIncome}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-full">
            <FaMoneyBillWave className="text-gray-600 text-2xl" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Total Expense</h3>
            <p className="text-2xl">₹{stats.totalExpense}</p>
          </div>
          <div className="bg-red-200 p-2 rounded-full">
            <FaChartPie className="text-red-600 text-2xl" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Net Savings</h3>
            <p className="text-2xl">₹{stats.netSavings}</p>
          </div>
          <div className="bg-green-200 p-2 rounded-full">
            <FaExchangeAlt className="text-green-600 text-2xl" />
          </div>
        </div>
      </div>
      <div className="rounded-md mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white  flex flex-col items-center p-8">
            <h3 className="text-left text-sm  mb-2">Current Status</h3>
            <div className="w-60 h-60">
              <Pie data={currentStatusData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>
          <div className="bg-white flex flex-col items-center p-8">
            <h3 className="text-left text-sm  mb-2">Income by Category</h3>
            <div className="w-60 h-60">
              <Pie data={incomeData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>
          <div className="bg-white  flex flex-col items-center p-8">
            <h3 className="text-left text-sm  mb-2">Expense by Category</h3>
            <div className="w-60 h-60">
              <Pie data={expenseData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
      </div>

<div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <h3 className="text-sm  mb-2">Income by Category</h3>
          <ul className="bg-white rounded-md p-4 h-96 overflow-auto">
            {Object.entries(stats.incomeByCategory).map(([category, amount]) => (
              <li key={category} className="flex justify-between border-b py-2 last:border-b-0">
                <span>{category}</span>
                <span>₹{amount}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="text-sm  mb-2">Expense by Category</h3>
          <ul className="bg-white rounded-md p-4 h-96 overflow-auto">
            {Object.entries(stats.expenseByCategory).map(([category, amount]) => (
              <li key={category} className="flex justify-between border-b py-2 last:border-b-0">
                <span>{category}</span>
                <span>₹{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm  mb-2">Recent Transactions</h3>
        <ul className="bg-white rounded-md p-4">
          {stats.transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between border-b py-2 last:border-b-0">
              <div>
                <p>{transaction.description}</p>
                <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleString()}</p>
              </div>
              <span>₹{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
