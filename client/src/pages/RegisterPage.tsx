import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';
import { FaDumbbell } from 'react-icons/fa';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      if (response.data.success) {
        setIsSuccess(true);
        toast.success('Profile initialization initiated');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Initialization failed');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center -mt-20">
        <div className="max-w-lg w-full mx-auto p-12 bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-800 rounded-none text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 border border-primary-200 dark:border-primary-800 rounded-none flex items-center justify-center mx-auto mb-8 text-2xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900 dark:text-white">Verify your identity</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
            We've transmitted a verification link to your email. Confirm your address to activate your AI Coach.
          </p>
          <Link to="/login" className="block w-full py-4 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary-600 font-bold tracking-wide transition-colors">
            Access Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full -mt-20">
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-gray-50 dark:bg-[#0a0a0f] p-8 sm:p-16 lg:p-24 relative order-2 lg:order-1">
        <div className="absolute top-10 left-10 lg:hidden">
          <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white font-bold font-heading">
            <FaDumbbell className="text-accent-500" /> OptiFit AI
          </Link>
        </div>
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md mx-auto">
          <h2 className="text-4xl font-bold mb-2 font-heading text-gray-900 dark:text-white">Initialize Profile</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Input baseline metrics to begin.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Full Name</label>
              <input 
                {...register('name')}
                type="text" 
                className="w-full px-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="Athlete Name"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
              <input 
                {...register('email')}
                type="email" 
                className="w-full px-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="athlete@domain.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Secure Password</label>
              <input 
                {...register('password')}
                type="password" 
                className="w-full px-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm text-red-500 font-medium">{errors.password.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 px-4 mt-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-accent-600 dark:hover:bg-accent-500 font-bold tracking-wide rounded-none transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Create Profile'
              )}
            </button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
            Already optimized? <Link to="/login" className="text-gray-900 dark:text-white font-bold hover:text-accent-500 dark:hover:text-accent-400 transition-colors">Access Dashboard ↗</Link>
          </div>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop" 
          alt="Athlete preparing in locker room"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-6xl font-bold mb-6 font-heading text-white leading-tight">
              Begin your protocol.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg border-l-4 border-accent-500 pl-4">
              Stop guessing. Join OptiFit AI to generate your first hyper-personalized, data-driven routine.
            </p>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
