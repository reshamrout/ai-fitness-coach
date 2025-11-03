import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

export default function Header() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          AI Fitness Coach
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
}