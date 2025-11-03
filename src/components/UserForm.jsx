import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

export default function UserForm({ onSubmit }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = "w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">Create Your AI Fitness Plan</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Tell us about yourself, and our AI will generate a plan just for you.
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
            <input type="number" name="age" id="age" className={inputStyle} value={formData.age} onChange={handleChange} required />
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
            <input type="number" name="height" id="height" className={inputStyle} value={formData.height} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="weight" className={labelStyle}>Weight (kg)</label>
            <input type="number" name="weight" id="weight" className={inputStyle} value={formData.weight} onChange={handleChange} required />
          </div>
        </div>

        {/* --- Fitness Goals --- */}
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

        {/* --- Preferences --- */}
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
          <textarea name="medical" id="medical" rows="3" className={inputStyle} value={formData.medical} onChange={handleChange} placeholder="e.g., knee pain, high stress..."></textarea>
        </div>
        
        {/* --- Submit --- */}
        <motion.button 
          type="submit" 
          className="w-full py-3 px-6 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate My Plan
        </motion.button>
      </form>
    </motion.div>
  );
}