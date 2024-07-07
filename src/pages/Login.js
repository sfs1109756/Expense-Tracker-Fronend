import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await loginUser(username, password);
      // Store token and login status in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expenseLoggedIN', 'true');
      setLoggedIn(true);
      history.push('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl  text-center">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md flex justify-center items-center"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
          <div className="text-sm text-center">
            <a href="#" className="text-blue-600">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
