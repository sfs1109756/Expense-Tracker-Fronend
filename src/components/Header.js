import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="shadow-md p-4 flex justify-between items-center md:hidden">
      <h1 className="text-xl ">Expense Tracker</h1>
      <button onClick={() => setIsSidebarOpen(prev => !prev)} className="text-black focus:outline-none">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
};

export default Header;
