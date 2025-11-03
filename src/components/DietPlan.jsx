import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { playTextToSpeech } from '../api/elevenLabs';
import { FaVolumeUp, FaImage } from 'react-icons/fa';
import Modal from './Modal';
import { generateVisualImage } from '../api/gemini'; 
import toast from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DietPlan({ plan }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleReadAll = async (dayPlan) => {
    setIsSpeaking(true);
    toast.loading('AI voice is warming up...');
    let text = `Diet for ${dayPlan.day}. 
      Breakfast: ${dayPlan.meals.breakfast}. 
      Lunch: ${dayPlan.meals.lunch}. 
      Dinner: ${dayPlan.meals.dinner}. 
      Snack: ${dayPlan.meals.snack}.`;
    
    try {
      await playTextToSpeech(text);
    } catch (error) {
      toast.error('Could not play audio.');
    }
    toast.dismiss();
    setIsSpeaking(false);
  };

  const handleImageGen = async (mealName) => {
    setModalContent(<div><p>Generating image for "{mealName}"...</p></div>);
    setModalOpen(true);
    
    const prompt = `Generate a high-quality, delicious-looking food photo of "${mealName}", plated beautifully on a table.`;
    
    try {
      const url = await generateVisualImage(prompt);
      setModalContent(<img src={url} alt={mealName} className="w-full rounded-lg" />);
    } catch (error) {
      toast.error('Could not generate image.');
      setModalOpen(false);
    }
  };

  return (
    <>
      <motion.div 
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">🥗 Your Diet Plan</h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1">
            {plan.map((day) => (
              <Tab key={day.day} className={ ({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white dark:bg-gray-700 shadow text-green-700 dark:text-green-300'
                    : 'text-green-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                {day.day}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <AnimatePresence mode="wait">
              {plan.map((day) => (
                <Tab.Panel key={day.day} as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 space-y-3"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">Daily Meals</h3>
                    <button onClick={() => handleReadAll(day)} disabled={isSpeaking}>
                      <FaVolumeUp className="text-green-500" />
                    </button>
                  </div>
                  
                  {Object.entries(day.meals).map(([mealType, meal]) => (
                    <div key={mealType} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <strong className="capitalize text-lg">{mealType}</strong>
                        <p className="text-gray-600 dark:text-gray-400">{meal}</p>
                      </div>
                      <button onClick={() => handleImageGen(meal)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title={`Visualize ${meal}`}>
                        <FaImage className="text-gray-500" />
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