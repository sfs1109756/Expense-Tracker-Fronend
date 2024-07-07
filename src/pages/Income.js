import React, { useEffect, useState } from 'react';
import { getIncomes, addIncome, editIncome, deleteIncome } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import IncomeModal from '../components/IncomeModal';
import { useHistory } from 'react-router-dom';

const Income = () => {
    const history = useHistory();
  const [incomes, setIncomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [message, setMessage] = useState('');

  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getIncomes(token);
      setIncomes(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching incomes', error);
      }
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleAddIncome = async (income) => {
    try {
      const token = localStorage.getItem('token');
      await addIncome(token, income);
      setMessage('Income added successfully');
      fetchIncomes(); // Refresh the list
    } catch (error) {
      setMessage('Failed to add income');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error adding income', error);
      }
    }
  };

  const handleEditIncome = async (income) => {
    try {
      const token = localStorage.getItem('token');
      await editIncome(token, {...income,income_id:selectedIncome.id});
      setMessage('Income edited successfully');
      fetchIncomes(); // Refresh the list
    } catch (error) {
      setMessage('Failed to edit income');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error editing income', error);
      }
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteIncome(token, incomeId);
      setMessage('Income deleted successfully');
      fetchIncomes(); // Refresh the list
    } catch (error) {
      setMessage('Failed to delete income');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error deleting income', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">Income</h2>
      {message && <div className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setSelectedIncome(null);
          setIsModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Income
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Source</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Amount</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Description</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(income => (
              <tr key={income.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">{income.source}</td>
                <td className="p-4 border-b border-gray-200">₹{income.amount}</td>
                <td className="p-4 border-b border-gray-200">{income.description}</td>
                <td className="p-4 border-b border-gray-200">{new Date(income.date).toLocaleDateString()}</td>
                <td className="p-4 border-b border-gray-200">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => {
                      setSelectedIncome(income);
                      setIsModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteIncome(income.id)}
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
        <IncomeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={selectedIncome ? handleEditIncome : handleAddIncome}
          income={selectedIncome}
        />
      )}
    </div>
  );
};

export default Income;
