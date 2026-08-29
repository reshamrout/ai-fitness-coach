import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500">You're on a {user?.streak} day streak. Keep it up 🔥</p>
        </div>
        <button onClick={logout} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
          Log out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Your Active Plan</h2>
          <p className="text-gray-500 mb-6">You don't have an active plan right now.</p>
          <Link to="/generate" className="px-6 py-3 bg-indigo-600 text-white rounded-lg inline-block">
            Generate New Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
