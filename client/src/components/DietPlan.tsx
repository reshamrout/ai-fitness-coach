import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaImage } from 'react-icons/fa';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { apiClient } from '../api/client';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DietPlan({ plan }: { plan: any[] }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleReadAll = async (dayPlan: any) => {
    setIsSpeaking(true);
    toast.loading('AI voice is warming up...', { id: 'tts' });
    let text = `Diet for ${dayPlan.day}. 
      Breakfast: ${dayPlan.meals.breakfast}. 
      Lunch: ${dayPlan.meals.lunch}. 
      Dinner: ${dayPlan.meals.dinner}. 
      Snack: ${dayPlan.meals.snack}.`;
    
    try {
      const response = await apiClient.post('/ai/tts', { text }, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
      toast.success('Playing audio!', { id: 'tts' });
    } catch (error) {
      toast.error('Could not play audio.', { id: 'tts' });
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleImageGen = async (mealName: string) => {
    setModalContent(
      <div className="flex flex-col items-center py-8">
        <div className="w-12 h-12 border-4 border-accent-200 dark:border-accent-900 border-t-accent-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Generating image for "{mealName}"...</p>
      </div>
    );
    setModalOpen(true);
    
    const prompt = `Generate a high-quality, delicious-looking food photo of "${mealName}", plated beautifully on a table.`;
    
    try {
      const { data } = await apiClient.post('/ai/image', { prompt });
      if (data.success) {
        setModalContent(
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4 text-center">{mealName}</h3>
            <img src={data.data.url} alt={mealName} className="w-full h-auto rounded-xl shadow-md" />
          </div>
        );
      }
    } catch (error) {
      toast.error('Could not generate image.');
      setModalOpen(false);
    }
  };

  return (
    <>
      <motion.div 
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-accent-600 dark:text-accent-400 font-heading">🥗 Your Diet Plan</h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-accent-900/10 dark:bg-accent-900/30 p-1 overflow-x-auto">
            {plan.map((day) => (
              <Tab key={day.day} className={ ({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5 whitespace-nowrap transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white dark:bg-gray-700 shadow text-accent-700 dark:text-accent-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-900 dark:hover:text-white'
                )
              }>
                {day.day}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <AnimatePresence mode="wait">
              {plan.map((day) => (
                <Tab.Panel key={day.day} as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4"
                >
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold font-heading">Daily Meals</h3>
                    <button onClick={() => handleReadAll(day)} disabled={isSpeaking} className="p-3 rounded-full hover:bg-accent-100 dark:hover:bg-accent-900/50 transition-colors disabled:opacity-50">
                      <FaVolumeUp className="text-accent-600 dark:text-accent-400 text-xl" />
                    </button>
                  </div>
                  
                  {Object.entries(day.meals).map(([mealType, meal]: [string, any]) => (
                    <div key={mealType} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1">
                      <div>
                        <strong className="capitalize text-lg text-gray-900 dark:text-white">{mealType}</strong>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{meal}</p>
                      </div>
                      <button onClick={() => handleImageGen(meal)} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-accent-500 transition-colors" title={`Visualize ${meal}`}>
                        <FaImage size={20} />
                      </button>
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </AnimatePresence>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
}