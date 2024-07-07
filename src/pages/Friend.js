import React, { useEffect, useState } from 'react';
import { getFriends, addFriend, deleteFriend } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddFriendModal from '../components/AddFriendModal';
import { useHistory } from 'react-router-dom';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getFriends(token);
      setFriends(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error fetching friends', error);
      }
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleAddFriend = async (friend) => {
    try {
      const token = localStorage.getItem('token');
      await addFriend(token, friend);
      fetchFriends(); // Refresh the table
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error adding friend', error);
      }
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteFriend(token, friendId);
      fetchFriends(); // Refresh the table
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Invalid token') {
        localStorage.clear();
        history.push('/login');
      } else {
        console.error('Error deleting friend', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">Friends</h2>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Friend
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Total Given</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Total Received</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Balance</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {friends.map(friend => (
              <tr key={friend.id} className="hover:bg-gray-50" >
                <td className="p-4 border-b border-gray-200" onClick={()=>history.push(`/friends/${friend.id}`)} >{friend.name}</td>
                <td className="p-4 border-b border-gray-200"onClick={()=>history.push(`/friends/${friend.id}`)}>₹{friend.amountGiven}</td>
                <td className="p-4 border-b border-gray-200"onClick={()=>history.push(`/friends/${friend.id}`)}>₹{friend.amountReceived}</td>
                <td className="p-4 border-b border-gray-200"onClick={()=>history.push(`/friends/${friend.id}`)}>₹{friend.balance}</td>
                <td className="p-4 border-b border-gray-200">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteFriend(friend.id)}
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
        <AddFriendModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddFriend}
        />
      )}
    </div>
  );
};

export default Friends;
