import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Format history for Gemini API
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const { data } = await apiClient.post('/ai/chat', { message: userMessage, history });
      if (data.success) {
        setMessages(prev => [...prev, { role: 'coach', content: data.data.reply }]);
      }
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="bg-primary-600 text-white p-4 text-center">
        <h2 className="font-bold text-xl font-heading">OptiFit AI Coach</h2>
        <p className="text-sm text-primary-100">Ask me anything about fitness or nutrition!</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900/50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-4xl mb-4">👋</p>
            <p>Say hello to start chatting!</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm rounded-tl-none border border-gray-100 dark:border-gray-600'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 border border-gray-100 dark:border-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Type your message..."
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
