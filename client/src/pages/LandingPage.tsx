import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaAppleAlt, FaDumbbell, FaBrain, FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "How does the AI generate my plan?",
    answer: "We use a fine-tuned Google Gemini LLM combined with proprietary heuristics. It ingests your biometrics (age, weight, height), goals (hypertrophy, fat loss, endurance), and constraints (allergies, injuries, schedule) to synthesize a mathematically sound, periodized protocol."
  },
  {
    question: "Do I need a gym membership?",
    answer: "No. The AI adapts to your environment. If you only have resistance bands in a hotel room, it will generate a hypertrophy-focused band routine. If you have a full commercial gym, it will utilize barbells and cables."
  },
  {
    question: "Can I follow the diet if I am Vegan or Keto?",
    answer: "Absolutely. The nutrition engine calculates your total daily energy expenditure (TDEE) and macronutrient splits, then maps those constraints perfectly onto any dietary preference, generating exact meals and high-fidelity visualizations."
  },
  {
    question: "How is this different from a normal fitness app?",
    answer: "Traditional apps give you static templates. OptiFit AI dynamically generates unique protocols. As you progress, plateau, or change goals, the AI Coach recalculates your entire protocol in milliseconds."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center justify-center -mt-20">
      
      {/* 1. Hero Section - Brutalist / Premium */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 relative bg-[#0a0a0f] text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop" 
              alt="Athlete" 
              className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-none mb-8">
             <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
             <span className="text-sm font-bold tracking-widest uppercase text-gray-300">System Online v2.4</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-heading tracking-tighter leading-none text-white drop-shadow-2xl uppercase">
            Outwork <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Your Genetics</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-400 leading-relaxed font-light border-l-2 border-accent-500 pl-6 text-left">
            OptiFit AI engineers hyper-personalized, data-driven fitness protocols. Stop guessing. Execute the math.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
            <Link to="/register" className="flex-1 py-5 px-8 bg-white text-gray-900 font-bold text-lg hover:bg-accent-500 hover:text-white transition-colors uppercase tracking-widest text-center border-none">
              Initialize Profile
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Features Grid */}
      <section id="features" className="w-full py-32 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-gray-900 dark:text-white uppercase">The Protocol</h2>
              <p className="text-2xl text-gray-500 dark:text-gray-400 font-light">
                We analyze 14 unique biometric and environmental data points to construct a protocol that forces adaptation.
              </p>
            </div>
            <Link to="/register" className="text-accent-600 dark:text-accent-400 font-bold tracking-wider uppercase flex items-center gap-2 hover:gap-4 transition-all">
              View Architecture <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
            {/* Fitness */}
            <div className="bg-white dark:bg-gray-900 p-10 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-12 h-12 text-primary-500 mb-8">
                <FaDumbbell size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Adaptive Overload</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Algorithms dictate exact sets, reps, and RPE based on your specific goal, ensuring mathematically optimal volume progression.
              </p>
            </div>
            
            {/* Diet */}
            <div className="bg-white dark:bg-gray-900 p-10 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-12 h-12 text-accent-500 mb-8">
                <FaAppleAlt size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Macro Precision</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                TDEE is calculated dynamically. Meals are generated to hit exact macronutrient targets down to the gram, accommodating any restriction.
              </p>
            </div>

            {/* Health */}
            <div className="bg-white dark:bg-gray-900 p-10 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-12 h-12 text-pink-500 mb-8">
                <FaHeartbeat size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Biometric Sync</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Monitor recovery, log consistency streaks, and adjust variables in real-time when life forces you to miss a session.
              </p>
            </div>

            {/* Mindset */}
            <div className="bg-white dark:bg-gray-900 p-10 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-12 h-12 text-purple-500 mb-8">
                <FaBrain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">24/7 AI Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Our fine-tuned LLM acts as an elite coach in your pocket, capable of answering complex physiological questions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Science */}
      <section id="science" className="w-full py-32 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase tracking-widest text-gray-500">Methodology</div>
            <h2 className="text-5xl font-bold font-heading leading-tight uppercase tracking-tight">
              Data, not dogma.
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
              <p>
                The human body is an input-output system. Give it the correct stimulus (training volume) and the correct raw materials (macronutrients), and adaptation (muscle growth or fat loss) is a mathematical certainty.
              </p>
              <p>
                OptiFit AI removes human error. By parsing your biometrics through Google's Gemini models, we generate protocols that adhere strictly to peer-reviewed sports science principles. No fad diets. No junk volume.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">98%</div>
                <div className="text-sm uppercase tracking-wide text-gray-500">Macro Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">&lt;2s</div>
                <div className="text-sm uppercase tracking-wide text-gray-500">Protocol Generation</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[600px] bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
             {/* Abstract UI representation */}
             <div className="w-full max-w-md bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-800 p-6 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-bold uppercase">Caloric Target</span>
                  <span className="text-2xl font-heading">2,450 kcal</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs uppercase mb-2"><span>Protein</span><span>180g</span></div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full"><div className="h-full bg-accent-500 w-[70%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs uppercase mb-2"><span>Carbs</span><span>250g</span></div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full"><div className="h-full bg-primary-500 w-[80%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs uppercase mb-2"><span>Fats</span><span>80g</span></div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full"><div className="h-full bg-pink-500 w-[50%]"></div></div>
                  </div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-500/10 to-accent-500/10 rounded-full filter blur-3xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* 4. Visual Content Section */}
      <section className="w-full py-32 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-20">
          <div className="flex-1 relative w-full h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?q=80&w=2000&auto=format&fit=crop" 
              alt="Precision Nutrition" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
            />
            <div className="absolute inset-0 border border-gray-900/10 dark:border-white/10 m-4"></div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-bold font-heading leading-tight uppercase tracking-tight">
              Visualize the fuel.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Adherence dictates success. OptiFit AI doesn't just output numbers; it generates high-fidelity visual representations of your prescribed meals, bridging the gap between clinical macros and culinary reality.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
                <span className="w-6 h-px bg-accent-500"></span> AI Generated Visuals
              </li>
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
                <span className="w-6 h-px bg-accent-500"></span> Infinite Variations
              </li>
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
                <span className="w-6 h-px bg-accent-500"></span> Total Restriction Support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. How it Works Section */}
      <section className="w-full py-32 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-heading mb-6 uppercase tracking-tight">Execution Phase</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">Three steps to initialize your protocol.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-12 border border-gray-100 dark:border-gray-800">
              <div className="text-6xl font-heading font-black text-gray-200 dark:text-gray-800 mb-8 leading-none">01</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Input Metrics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Supply baseline data. Age, weight, goals, environment. We calculate the mathematical baseline required for change.</p>
            </div>

            <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-12 border border-gray-100 dark:border-gray-800">
              <div className="text-6xl font-heading font-black text-gray-200 dark:text-gray-800 mb-8 leading-none">02</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Generate</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">The LLM processes your parameters, parsing them into a structured JSON payload detailing a 7-day microcycle.</p>
            </div>

            <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-12 border border-gray-100 dark:border-gray-800">
              <div className="text-6xl font-heading font-black text-gray-200 dark:text-gray-800 mb-8 leading-none">03</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Execute</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Follow the protocol. Use the AI Chat layer to dynamically adjust variables if anomalies in your schedule arise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="w-full py-32 px-4 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-heading mb-6 uppercase tracking-tight">Database Query</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">Frequently accessed information.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-bold uppercase tracking-wide text-sm">{faq.question}</span>
                  <FaChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-accent-500' : 'text-gray-400'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Massive Footer */}
      <footer className="w-full bg-[#0a0a0f] text-white pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-gray-800 pb-20">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <FaDumbbell size={24} className="text-accent-500" />
                <span className="text-3xl font-bold font-heading tracking-tight uppercase">OptiFit AI</span>
              </Link>
              <p className="text-gray-500 max-w-sm font-light leading-relaxed">
                Elite-level fitness and nutrition intelligence, accessible instantly. Built for those who demand precision over platitudes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-6">Navigation</h4>
              <ul className="space-y-4 text-gray-500 font-light">
                <li><a href="/#features" className="hover:text-white transition-colors">The Protocol</a></li>
                <li><a href="/#science" className="hover:text-white transition-colors">Methodology</a></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Authenticate</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500 font-light">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm font-light">
            <p>&copy; {new Date().getFullYear()} OptiFit AI. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              System Status: <span className="text-accent-500 font-bold uppercase tracking-wide ml-2">Operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
