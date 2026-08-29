import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage } from 'react-icons/fa';
import Modal from './Modal'; 
import { generateVisualImage } from '../api/gemini'; 
import toast from 'react-hot-toast';

export default function Exercise({ exercise }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleImageGeneration = async () => {
    setIsModalOpen(true);
    setIsLoadingImage(true);
    
 
    const prompt = `Generate a high-quality, photorealistic image of a person performing a "${exercise.exercise}", in a bright, modern gym setting.`;
    
    try {
      const url = await generateVisualImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      toast.error('Could not generate image.');
      setIsModalOpen(false); 
    }
    setIsLoadingImage(false);
  };

  return (
    <>
      <motion.li 
        className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <strong className="text-lg font-medium">{exercise.exercise}</strong>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {exercise.sets} sets x {exercise.reps} reps (Rest: {exercise.rest})
          </p>
        </div>
        <button 
          onClick={handleImageGeneration}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title={`Visualize ${exercise.exercise}`}
        >
          <FaImage className="text-gray-500" />
        </button>
      </motion.li>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoadingImage ? (
          <div className="text-center p-4">
            <p>Generating image for "{exercise.exercise}"...</p>
          </div>
        ) : (
          <img src={imageUrl} alt={exercise.exercise} className="w-full rounded-lg" />
        )}
      </Modal>
    </>
  );
}