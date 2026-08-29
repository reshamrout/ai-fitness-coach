import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

export default function UserForm() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'weightLoss',
    level: 'beginner',
    location: 'gym',
    diet: 'nonVeg',
    medical: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Convert numeric fields properly for the schema
    const payload = {
      ...formData,
      age: parseInt(formData.age, 10),
      height: parseInt(formData.height, 10),
      weight: parseInt(formData.weight, 10),
    };

    try {
      toast.loading('AI is crafting your perfect plan...', { id: 'generate' });
      const { data } = await apiClient.post('/plans', payload);
      
      if (data.success) {
        toast.success('Plan generated successfully!', { id: 'generate' });
        navigate(`/plan/${data.data._id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Failed to generate plan', { id: 'generate' });
    } finally {
      setIsGenerating(false);
    }
  };

  const inputStyle = "w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors";
  const labelStyle = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold font-heading text-center mb-4 text-gray-900 dark:text-white">
        Create Your AI <span className="text-primary-600 dark:text-primary-400">Fitness Plan</span>
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        Tell us about yourself, and our AI will generate a tailored 7-day workout and diet schedule just for you.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Basic Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelStyle}>Name</label>
            <input type="text" name="name" id="name" className={inputStyle} value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="age" className={labelStyle}>Age</label>
            <input type="number" name="age" id="age" className={inputStyle} value={formData.age} onChange={handleChange} required min="10" max="100" />
          </div>
        </div>

        {/* --- Physical Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="gender" className={labelStyle}>Gender</label>
            <select name="gender" id="gender" className={inputStyle} value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="height" className={labelStyle}>Height (cm)</label>
            <input type="number" name="height" id="height" className={inputStyle} value={formData.height} onChange={handleChange} required min="100" max="250" />
          </div>
          <div>
            <label htmlFor="weight" className={labelStyle}>Weight (kg)</label>
            <input type="number" name="weight" id="weight" className={inputStyle} value={formData.weight} onChange={handleChange} required min="30" max="300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="goal" className={labelStyle}>Fitness Goal</label>
            <select name="goal" id="goal" className={inputStyle} value={formData.goal} onChange={handleChange}>
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="stamina">Improve Stamina</option>
              <option value="general">General Fitness</option>
            </select>
          </div>
          <div>
            <label htmlFor="level" className={labelStyle}>Fitness Level</label>
            <select name="level" id="level" className={inputStyle} value={formData.level} onChange={handleChange}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className={labelStyle}>Workout Location</label>
            <select name="location" id="location" className={inputStyle} value={formData.location} onChange={handleChange}>
              <option value="gym">Gym</option>
              <option value="home">Home</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
          <div>
            <label htmlFor="diet" className={labelStyle}>Dietary Preference</label>
            <select name="diet" id="diet" className={inputStyle} value={formData.diet} onChange={handleChange}>
              <option value="nonVeg">Non-Vegetarian</option>
              <option value="veg">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
            </select>
          </div>
        </div>
        
        {/* --- Optional --- */}
        <div>
          <label htmlFor="medical" className={labelStyle}>Medical History / Stress (Optional)</label>
          <textarea name="medical" id="medical" rows={3} className={inputStyle} value={formData.medical} onChange={handleChange} placeholder="e.g., knee pain, high stress..."></textarea>
        </div>
        
        {/* --- Submit --- */}
        <button 
          type="submit" 
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
        >
          {isGenerating ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating Plan...
            </span>
          ) : (
            'Generate My Plan'
          )}
        </button>
      </form>
    </motion.div>
  );
}