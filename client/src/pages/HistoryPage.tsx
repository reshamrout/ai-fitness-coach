import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import Loader from '../components/Loader';
import { FaCalendarAlt, FaChevronRight } from 'react-icons/fa';

export default function HistoryPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await apiClient.get('/plans');
        if (data.success) {
          setPlans(data.data.plans);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-heading mb-8 text-gray-900 dark:text-white">Your Plan History</h1>
      
      {plans.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <FaCalendarAlt className="mx-auto text-5xl text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-medium mb-2">No plans generated yet</h2>
          <p className="text-gray-500 mb-6">Create your first personalized fitness plan.</p>
          <Link to="/generate" className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Generate Plan
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan: any) => (
            <Link 
              key={plan._id} 
              to={`/plan/${plan._id}`}
              className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center rounded-xl text-xl">
                  {plan.formData?.goal === 'weightLoss' ? '📉' : plan.formData?.goal === 'muscleGain' ? '💪' : '🏃'}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading">{plan.label || 'Custom Fitness Plan'}</h3>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>Generated: {new Date(plan.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="capitalize">{plan.formData?.goal.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-400">
                <FaChevronRight />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
