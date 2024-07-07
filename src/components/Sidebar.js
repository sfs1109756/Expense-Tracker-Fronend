import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaMoneyBillWave, FaChartPie, FaExchangeAlt } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => (

  
       <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between md:hidden p-4">
        <h2 className="text-2 xl  ">Expense Tracker</h2>
        <button onClick={() => setIsSidebarOpen(false)} className="text-white focus:outline-none">
          ✕
        </button>
      </div>
    
    <nav className="flex-1">
      <ul>
        <li className="p-4 flex items-center">
          <FaHome className="mr-2" />
          <Link to="/">Dashboard</Link>
        </li>
        <li className="p-4 flex items-center">
          <FaUserFriends className="mr-2" />
          <Link to="/friends">Friends</Link>
        </li>
        <li className="p-4 flex items-center">
          <FaMoneyBillWave className="mr-2" />
          <Link to="/income">Income</Link>
        </li>
        <li className="p-4 flex items-center">
          <FaChartPie className="mr-2" />
          <Link to="/expense">Expense</Link>
        </li>
        <li className="p-4 flex items-center">
          <FaExchangeAlt className="mr-2" />
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
        </aside>

);

export default Sidebar;



