import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense, editExpense, deleteExpense } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import ExpenseModal from '../components/ExpenseModal';
import { useHistory } from 'react-router-dom';

const Expense = () => {
    const history = useHistory();
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [message, setMessage] = useState('');

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getExpenses(token);
      setExpenses(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching expenses', error);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      const token = localStorage.getItem('token');
      await addExpense(token, expense);
      setMessage('Expense added successfully');
      fetchExpenses(); // Refresh the list
    } catch (error) {
      setMessage('Failed to add expense');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error adding expense', error);
      }
    }
  };

  const handleEditExpense = async (expense) => {
    try {
      const token = localStorage.getItem('token');
      await editExpense(token, {...expense,expense_id:selectedExpense.id});
      setMessage('Expense edited successfully');
      fetchExpenses(); // Refresh the list
    } catch (error) {
      setMessage('Failed to edit expense');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error editing expense', error);
      }
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteExpense(token, expenseId);
      setMessage('Expense deleted successfully');
      fetchExpenses(); // Refresh the list
    } catch (error) {
      setMessage('Failed to delete expense');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error deleting expense', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">Expense</h2>
      {message && <div className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setSelectedExpense(null);
          setIsModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Expense
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Description</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">{expense.category}</td>
                <td className="p-4 border-b border-gray-200">₹{expense.amount}</td>
                <td className="p-4 border-b border-gray-200">{expense.description}</td>
                <td className="p-4 border-b border-gray-200">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="p-4 border-b border-gray-200">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => {
                      setSelectedExpense(expense);
                      setIsModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedExpense ? handleEditExpense : handleAddExpense}
          expense={selectedExpense}
        />
      )}
    </div>
  );
};

export default Expense;
