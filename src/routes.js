import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Friends from './pages/Friend';
import FriendDetail from './pages/FriendDetail';
import ProtectedRoute from './ProtectedRoute';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Transactions from './pages/Transactions';

const Routes = ({ setLoggedIn }) => (
  <Switch>
    <Route exact path="/login" render={(props) => <Login {...props} setLoggedIn={setLoggedIn} />} />
    <Route exact path="/signup" component={Signup} />
    <ProtectedRoute exact path="/" component={Dashboard} />
    <ProtectedRoute exact path="/friends" component={Friends} />
    <ProtectedRoute exact path="/friends/:id" component={FriendDetail} />
    <ProtectedRoute exact path="/income" component={Income} />
    <ProtectedRoute exact path="/expense" component={Expense} />
    <ProtectedRoute exact path="/transactions" component={Transactions} />
    {/* Add other protected routes here */}
  </Switch>
);

export default Routes;
