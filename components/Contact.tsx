'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputClasses = (name: string) => `
    w-full bg-white/[0.02] border transition-all duration-300 rounded-xl px-4 py-4
    text-white outline-none font-light placeholder:text-white/20
    ${focusedField === name 
      ? 'border-sulva-gold bg-white/[0.05] shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-sulva-gold/50' 
      : 'border-white/10 hover:border-white/30'}
  `;

  return (
    <section id="contact" className="relative min-h-screen bg-sulva-black py-32 overflow-hidden flex items-center">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-sulva-purple/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[5%] w-[40%] h-[40%] rounded-full bg-sulva-gold/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-8 z-10 flex flex-col xl:flex-row gap-24">
        
        {/* Left Side */}
        <div className="w-full xl:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-sans font-medium tracking-tight leading-[1.05] text-white mb-8">
              Let’s Build Something <span className="text-sulva-white-warm/50">Meaningful.</span>
            </h2>
            <p className="text-lg sm:text-xl text-sulva-white-warm/70 font-light leading-relaxed max-w-lg mb-12">
              Whether it’s a bold product idea, an ambitious digital experience, or a futuristic system concept - I’m always interested in conversations that push technology forward.
            </p>
            
            <div className="space-y-8">
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sulva-white-warm/40 uppercase tracking-widest mb-2">Email</span>
                  <a href="mailto:iyiola@sulvatech.com" className="text-xl text-white hover:text-sulva-gold transition-colors font-light">iyiola@sulvatech.com</a>
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sulva-white-warm/40 uppercase tracking-widest mb-2">WhatsApp</span>
                  <a href="https://wa.me/2347068495149" target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-[#25D366] transition-colors font-light flex items-center gap-2">
                    +234 706 849 5149
                  </a>
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-mono text-sulva-white-warm/40 uppercase tracking-widest mb-2">Global Headquarters</span>
                  <span className="text-xl text-white font-light">Lagos, Nigeria - Operating Globally</span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full xl:w-1/2 relative">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="glass-panel p-8 sm:p-12 rounded-3xl relative z-10"
          >
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className={inputClasses('name')} 
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className={inputClasses('email')} 
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Company" 
                      className={inputClasses('company')} 
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Project Type (e.g. AI, Infrastructure)" 
                      className={inputClasses('projectType')} 
                      onFocus={() => setFocusedField('projectType')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    placeholder="Tell me about your vision..." 
                    rows={4}
                    className={inputClasses('message') + " resize-none"} 
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="pt-4">
                  <button className="w-full group relative px-8 py-5 bg-white text-sulva-black rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                    <div className="absolute inset-0 bg-sulva-white-warm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 font-medium tracking-wide flex items-center justify-center gap-3">
                      Start A Conversation
                    </span>
                  </button>
                </div>
             </form>
          </motion.div>
          
          {/* Decorative elements around form */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-sm -z-10"
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border border-sulva-purple/10 bg-sulva-purple/[0.01] backdrop-blur-sm -z-10"
          />
        </div>

      </div>
    </section>
  );
}
