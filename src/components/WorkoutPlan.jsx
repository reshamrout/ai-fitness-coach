import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react'; 
import Exercise from './Exercise';
import { playTextToSpeech } from '../api/elevenLabs';
import { FaVolumeUp } from 'react-icons/fa';
import toast from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function WorkoutPlan({ plan }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleReadAll = async (dayPlan) => {
    setIsSpeaking(true);
    toast.loading('AI voice is warming up...');
    
    let textToRead = `Workout for ${dayPlan.day}, focusing on ${dayPlan.focus}. `;
    dayPlan.routine.forEach(ex => {
      textToRead += `${ex.exercise}: ${ex.sets} sets of ${ex.reps}. `;
    });

    try {
      await playTextToSpeech(textToRead);
    } catch (error) {
      toast.error('Could not play audio.');
    }
    toast.dismiss();
    setIsSpeaking(false);
  };

  return (
    <motion.div 
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">🏋️ Your Workout Plan</h2>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {plan.map((day) => (
            <Tab
              key={day.day}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white dark:bg-gray-700 shadow text-blue-700 dark:text-blue-300'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {day.day}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <AnimatePresence mode="wait">
            {plan.map((day) => (
              <Tab.Panel
                key={day.day}
                as={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Focus: {day.focus}</h3>
                  <button 
                    onClick={() => handleReadAll(day)} 
                    disabled={isSpeaking}
                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 disabled:opacity-50"
                  >
                    <FaVolumeUp className="text-blue-500" />
                  </button>
                </div>

                {day.routine.length === 0 ? (
                  <p>Rest day! Enjoy.</p>
                ) : (
                  <ul className="space-y-3">
                    {day.routine.map((ex, index) => (
                      <Exercise key={index} exercise={ex} />
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </AnimatePresence>
        </Tab.Panels>
      </Tab.Group>
    </motion.div>
  );
}