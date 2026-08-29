import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import WorkoutPlan from '../components/WorkoutPlan';
import DietPlan from '../components/DietPlan';
import Loader from '../components/Loader';
import { FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function PlanViewPage() {
  const { id } = useParams();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data } = await apiClient.get(`/plans/${id}`);
        if (data.success) {
          setPlan(data.data);
        }
      } catch (error) {
        toast.error('Failed to load plan');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlan();
  }, [id]);

  if (loading) return <Loader />;

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Plan not found</h2>
        <Link to="/dashboard" className="text-primary-600 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard" className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-600 dark:text-gray-300">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-4xl font-bold font-heading">{plan.label || 'Your Custom Plan'}</h1>
          <p className="text-gray-500 mt-1">Generated on {new Date(plan.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WorkoutPlan plan={plan.workoutPlan} />
        <DietPlan plan={plan.dietPlan} />
      </div>
      
      <div className="mt-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-heading text-primary-600 dark:text-primary-400">💡 Coach's Advice</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {plan.aiTips}
        </div>
      </div>
    </div>
  );
}
