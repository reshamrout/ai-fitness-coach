import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <motion.div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          border: '5px solid #e9e9e9',
          borderTop: '5px solid #3498db',
        }}
        animate={{ rotate: 360 }}
        transition={{ loop: Infinity, duration: 1, ease: 'linear' }}
      />
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
        Generating your personalized plan...
      </p>
    </div>
  );
}