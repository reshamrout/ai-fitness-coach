import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';
import { FaDumbbell } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      if (response.data.success) {
        const { user, accessToken } = response.data.data;
        login(user, accessToken);
        toast.success('Authentication successful');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex w-full -mt-20">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop" 
          alt="Focused athlete training in dark gym"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 h-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-6xl font-bold mb-6 font-heading text-white leading-tight">
              Resume protocol.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg border-l-4 border-primary-500 pl-4">
              Your AI Coach is tracking your progress. Authenticate to access your personalized fitness and nutrition dashboards.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-gray-50 dark:bg-[#0a0a0f] p-8 sm:p-16 lg:p-24 relative">
        <div className="absolute top-10 left-10 lg:hidden">
          <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white font-bold font-heading">
            <FaDumbbell className="text-primary-500" /> OptiFit AI
          </Link>
        </div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md mx-auto">
          <h2 className="text-4xl font-bold mb-2 font-heading text-gray-900 dark:text-white">Authenticate</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">Enter your credentials to proceed.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
              <input 
                {...register('email')}
                type="email" 
                className="w-full px-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="athlete@domain.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                <a href="#" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">Recover Access</a>
              </div>
              <input 
                {...register('password')}
                type="password" 
                className="w-full px-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm text-red-500 font-medium">{errors.password.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 px-4 mt-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary-600 dark:hover:bg-primary-500 font-bold tracking-wide rounded-none transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
            New here? <Link to="/register" className="text-gray-900 dark:text-white font-bold hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Initialize your profile ↗</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
