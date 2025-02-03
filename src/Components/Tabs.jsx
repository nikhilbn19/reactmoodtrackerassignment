import React from "react";

const Tabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex justify-center space-x-3 my-5">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-5 py-3 rounded-lg text-lg transition-all duration-300 ${
            activeTab === tab
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
