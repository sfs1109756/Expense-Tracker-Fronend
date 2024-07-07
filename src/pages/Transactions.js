import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';
import { useHistory } from 'react-router-dom';


const Transactions = () => {

  const [transactions, setTransactions] = useState([]);
    const history = useHistory();
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getTransactions(token);
      setTransactions(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching transactions', error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">Transactions</h2>
      {message && <div className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Description</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">{transaction.type === 'income' ? 'Income' : 'Expense'}</td>
                <td className="p-4 border-b border-gray-200">₹{transaction.amount}</td>
                <td className="p-4 border-b border-gray-200">{transaction.description}</td>
                <td className="p-4 border-b border-gray-200">{new Date(transaction.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
