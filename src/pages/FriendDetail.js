import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getFriendDetail, addTransaction, deleteFriend, getFriendTransaction, giveToFriend, receiveFromFriend } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import TransactionModal from '../components/TransactionModal';
import { FaMoneyBillWave, FaChartPie, FaExchangeAlt } from 'react-icons/fa';

const FriendDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [friend, setFriend] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('give');
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const fetchFriendTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getFriendTransaction(token, id);
      setTransactions(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching friend transactions', error);
      }
    }
  };

  const fetchFriendDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getFriendDetail(token, id);
      setFriend(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching friend detail', error);
      }
    }
  };

  useEffect(() => {
    fetchFriendDetail();
    fetchFriendTransaction();
  }, [id]);

  const handleDeleteFriend = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteFriend(token, id);
      history.push('/friends'); // Redirect to friends list
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error deleting friend', error);
      }
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const token = localStorage.getItem('token');
      if(transactionType=="give"){
        await giveToFriend(token, transaction );
      }else{
        await receiveFromFriend(token, transaction );
      }
      
      setMessage('Transaction added successfully');
      fetchFriendDetail(); // Refresh the details
      fetchFriendTransaction(); // Refresh transactions
    } catch (error) {
      setMessage('Failed to add transaction');
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error adding transaction', error);
      }
    }
  };

  if (!friend) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
       <div>
        <h2 className="text-2xl  mb-0">{friend.name}</h2>
        <small>{friend.email}</small>
      </div>
      <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-3"
            onClick={() => {
              setTransactionType('give');
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Give Amount
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setTransactionType('receive');
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Receive Amount
          </button>
      </div>
      </div>
      
      


      {message && <div className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Total Given</h3>
            <p className="text-2xl">₹{friend.amountGiven}</p>
          </div>
          <div className="bg-red-200 p-2 rounded-full">
            <FaChartPie className="text-red-600 text-2xl" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Total Balance</h3>
            <p className="text-2xl">₹{friend.balance}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded-full">
            <FaMoneyBillWave className="text-gray-600 text-2xl" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-md flex items-center justify-between">
          <div>
            <h3 className="text-sm">Total Recieved</h3>
            <p className="text-2xl">₹{friend.amountReceived}</p>
          </div>
          <div className="bg-green-200 p-2 rounded-full">
            <FaExchangeAlt className="text-green-600 text-2xl" />
          </div>
        </div>
      </div>

      <h4 className="text-lg  mb-2">Transactions</h4>
      <div className="bg-white p-4 rounded-lg shadow">
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Description</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className={transaction.type ==="receive"?"bg-[#e9fbef] hover:bg-[#c7f6d8]":"hover:bg-gray-50"} >
                  <td className="p-4 border-b border-gray-200">{new Date(transaction.created_at).toLocaleDateString()}</td>
                  <td className="p-4 border-b border-gray-200">{transaction.description}</td>
                  <td className="p-4 border-b border-gray-200">₹{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
          friendId={id}
          transactionType={transactionType}
        />
      )}
    </div>
  );
};

export default FriendDetail;
