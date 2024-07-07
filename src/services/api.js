import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

export const loginUser = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const getDashboardStats = (token) => {
  return api.get('/dashboard/stats', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTransactions = (token) => {
  return api.get('/transactions', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getIncomes = (token) => {
  return api.get('/income', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addIncome = (token, incomeData) => {
  return api.post('/income/add', incomeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editIncome = (token, incomeData) => {
  return api.put(`/income/update/`, incomeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteIncome = (token, incomeId) => {
  return api.delete(`/income/delete/`, {
    headers: { Authorization: `Bearer ${token}` },
    data:{ "income_id": incomeId}
  });
};

export const getExpenses = (token) => {
  return api.get('/expenses', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addExpense = (token, expenseData) => {
  return api.post('/expenses/add', expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editExpense = (token, expenseData) => {
  return api.put(`/expenses/update/`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteExpense = (token, expenseId) => {
  return api.delete(`/expenses/delete/`, {
    headers: { Authorization: `Bearer ${token}` },
    data:{ "expense_id": expenseId}
  });
};

export const getFriends = (token) => {
  return api.get('/friends', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addFriend = (token, friendData) => {
  return api.post('/friends/add', friendData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteFriend = (token, friendId) => {
  return api.delete(`/friends/delete`,{
    headers: { Authorization: `Bearer ${token}` },
    data:{ "friend_id": friendId }
  });
};

export const getFriendTransaction = (token, friendId) => {
  return api.get(`/friends/${friendId}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getFriendDetail = (token, friendId) => {
  return api.get(`/friends/${friendId}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const giveToFriend = (token, data) => {

  return api.post(`/friends/give`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const receiveFromFriend = (token, data) => {
  return api.post(`/friends/receive`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};




export const addTransaction = (token, transactionData) => {
  return api.post('/transactions', transactionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



export default api;
