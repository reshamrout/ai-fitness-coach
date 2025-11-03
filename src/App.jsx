import React from 'react';
import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import WorkoutPlan from './components/WorkoutPlan';
import DietPlan from './components/DietPlan';
import Header from './components/Header';
import Loader from './components/Loader';
import { generateFullPlan } from './api/gemini';
import { exportToPdf } from './utils/exportToPdf';
import useLocalStorage from './hooks/useLocalStorage';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function App() {
  const [formData, setFormData] = useState('fitnessFormData', null);
  const [plan, setPlan] = useLocalStorage('fitnessPlan', null); 
  const [isLoading, setIsLoading] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(''); 


  useEffect(() => {
    setDailyQuote("\"The only bad workout is the one that didn't happen.\"");
  }, []);

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setFormData(data);
    setPlan(null); 
    try {
      const generatedPlan = await generateFullPlan(data);
      if (generatedPlan) {
        setPlan(generatedPlan);
        toast.success('Your personalized plan is ready!');
      } else {
        throw new Error('Failed to parse plan from AI.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error generating plan. Please try again.');
    }
    setIsLoading(false);
  };

  const handleRegenerate = () => {
    if (formData) {
      handleFormSubmit(formData);
    }
  };

  const handleSave = () => {
   
    toast.success('Plan saved to your browser!');
  };

  const handleExport = () => {
    if (plan) {
      toast.loading('Exporting to PDF...');
      exportToPdf(plan, formData);
      toast.dismiss();
      toast.success('PDF exported!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!plan && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UserForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}
        
        {isLoading && <Loader />}
        
        {plan && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* --- Action Buttons --- */}
            <div className="flex flex-wrap gap-2 justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <button onClick={handleRegenerate} className="btn-primary">Regenerate</button>
              <button onClick={() => { setPlan(null); setFormData(null); }} className="btn-secondary">New Plan</button>
              <button onClick={handleSave} className="btn-secondary">Save Plan</button>
              <button onClick={handleExport} className="btn-secondary">Export as PDF</button>
            </div>

            {/* --- Daily Quote --- */}
            <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
              <p className="text-lg italic">{dailyQuote}</p>
            </div>

            {/* --- Plans --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WorkoutPlan plan={plan.workoutPlan} />
              <DietPlan plan={plan.dietPlan} />
            </div>
            
            {/* --- AI Tips --- */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">🧠 AI Tips & Motivation</h2>
              <p className="text-lg whitespace-pre-wrap">{plan.aiTips}</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

