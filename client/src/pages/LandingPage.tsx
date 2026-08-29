import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaAppleAlt, FaDumbbell, FaBrain } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent-300 dark:bg-accent-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl"
        >
          <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold tracking-wide text-sm mb-6 inline-block">
            YOUR PERSONAL AI COACH
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-heading tracking-tight text-gray-900 dark:text-white">
            Transform your life with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">OptiFit AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            Stop guessing. Get hyper-personalized workout routines, exact macronutrient breakdowns, and expert health advice powered by cutting-edge AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1">
              Start Your Journey Free
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              Log In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">We analyze your age, weight, lifestyle, and goals to build a plan that actually fits into your life.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fitness */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                <FaDumbbell />
              </div>
              <h3 className="text-2xl font-bold mb-3">Adaptive Workouts</h3>
              <p className="text-gray-600 dark:text-gray-400">Gym, home, or outdoors. We craft a week-by-week routine targeting exactly what you need to grow.</p>
            </div>
            
            {/* Diet */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                <FaAppleAlt />
              </div>
              <h3 className="text-2xl font-bold mb-3">Precision Diet</h3>
              <p className="text-gray-600 dark:text-gray-400">Vegan? Keto? Just want to eat better? We generate daily meals, macronutrient splits, and healthy recipes.</p>
            </div>

            {/* Health */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                <FaHeartbeat />
              </div>
              <h3 className="text-2xl font-bold mb-3">Health Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor your recovery, log your streaks, and keep your cardiovascular health in perfect balance.</p>
            </div>

            {/* Mindset */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                <FaBrain />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Coach Chat</h3>
              <p className="text-gray-600 dark:text-gray-400">Have a question at 2 AM? Our elite AI Coach is available 24/7 to answer your fitness and nutrition questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Content Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              Visualize your meals before you make them.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tired of boring chicken and broccoli? OptiFit AI doesn't just tell you what to eat; it generates high-quality images of your prescribed meals so you know exactly what you are aiming for. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg font-medium">
                <span className="text-accent-500">✓</span> Visual Meal Inspiration
              </li>
              <li className="flex items-center gap-3 text-lg font-medium">
                <span className="text-accent-500">✓</span> Macro-balanced ingredients
              </li>
              <li className="flex items-center gap-3 text-lg font-medium">
                <span className="text-accent-500">✓</span> Accommodates any allergies
              </li>
            </ul>
            <Link to="/register" className="inline-block mt-4 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:shadow-lg transition-all">
              See Your Diet Plan
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-400 to-primary-500 rounded-[2.5rem] transform rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&w=800&q=80" 
              alt="Healthy vibrant food" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-purple-500 rounded-[2.5rem] transform -rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" 
              alt="Person working out" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover h-[500px]"
            />
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              Workouts that adapt to your progress.
            </h2>
            <p className="text-lg text-gray-300">
              Whether you are an absolute beginner looking to lose weight or an advanced athlete breaking plateaus, our AI understands human physiology and progressive overload.
            </p>
            <p className="text-lg text-gray-300">
              Listen to your workouts on the go! OptiFit AI uses ElevenLabs text-to-speech to dictate your workout routines directly to your headphones.
            </p>
            <Link to="/register" className="inline-block mt-4 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-500 hover:shadow-lg transition-all">
              Generate Workout
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
