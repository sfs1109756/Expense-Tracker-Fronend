import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loggedin = localStorage.getItem('expenseLoggedIN') ? localStorage.getItem('expenseLoggedIN') : false;

  return (
    <Router>
      <div className="app flex flex-col h-screen">
        {loggedin && <Header setIsSidebarOpen={setIsSidebarOpen} />}
        <div className="flex flex-1">
          {loggedin && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
          <div className={loggedin?"main-content flex-1 loggedIn": "main-content flex-1"}>
            <Routes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
