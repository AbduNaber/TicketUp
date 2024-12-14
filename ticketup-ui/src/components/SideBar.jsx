import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-[200px] h-screen bg-gray-200 p-3">
      <ul className="list-none p-0">
        <li className="mb-2 cursor-pointer hover:text-blue-500">Dashboard</li>
        <li className="mb-2 cursor-pointer hover:text-blue-500">Events</li>
        <li className="mb-2 cursor-pointer hover:text-blue-500">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
