'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

const NAV_LINKS = ['Home', 'About', 'Vision', 'Projects', 'Thinking', 'Contact'];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Home');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);

    let current = 'Home';
    for (const section of NAV_LINKS) {
      if (section === 'Home') continue;
      
      const element = document.getElementById(section.toLowerCase());
      if (element) {
         const rect = element.getBoundingClientRect();
         // If section is within the top third of the viewport, it is considered active
         if (rect.top <= window.innerHeight / 3) {
            current = section;
         }
      }
    }

    // Special bottom check for 'Contact' which might not reach the top
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      current = 'Contact';
    }
    
    // Very top check
    if (latest < 100) {
       current = 'Home';
    }

    if (current !== activeSection) {
      setActiveSection(current);
    }
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false);
    
    if (section === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Smooth scroll to element if it exists with offset for fixed navbar
    const element = document.getElementById(section.toLowerCase());
    if (element) {
        const navbarOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9], delay: 4.5 }} // delayed for preloader
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out flex justify-center px-4 sm:px-8 xl:px-12 ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className={`
          relative flex items-center justify-between w-full max-w-7xl transition-all duration-700 ease-[0.2,0.65,0.3,0.9]
          ${scrolled 
            ? 'px-6 py-4 bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.2)]' 
            : 'px-2 py-0 bg-transparent border-transparent'}
        `}>
          
          {/* LEFT: Identity */}
          <button 
            onClick={scrollToTop}
            className="group relative z-20 flex items-center outline-none"
          >
            <span className="text-[#F5F5F7] font-medium tracking-[0.15em] text-[13px] md:text-[14px] transition-all duration-500 group-hover:text-white group-hover:-translate-y-[1px] uppercase">
              Iyiola Ogunjobi
            </span>
          </button>

          {/* CENTER: Minimal Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 relative z-20" onMouseLeave={() => setHoveredLink(null)}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                onMouseEnter={() => setHoveredLink(link)}
                className={`
                  relative text-[13px] font-medium tracking-wide transition-all duration-500 outline-none
                  ${hoveredLink === link ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : hoveredLink ? 'text-white/20' : 'text-white/70'}
                `}
              >
                {link}
                {hoveredLink === link ? (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/70 rounded-full"
                    transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
                  />
                ) : activeSection === link && !hoveredLink ? (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-sulva-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    transition={{ duration: 0.3 }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          {/* RIGHT: CTA (Desktop) */}
          <div className="hidden lg:block z-20">
            <button 
              onClick={() => scrollToSection('contact')}
              className="relative px-6 py-2.5 bg-white/[0.02] overflow-hidden rounded-full border border-sulva-gold/20 backdrop-blur-md transition-all duration-500 hover:border-sulva-gold/40 hover:bg-white/[0.06] hover:scale-[1.02] group outline-none"
            >
              <span className="relative z-10 text-[12px] font-semibold tracking-widest text-[#F5F5F7] transition-colors duration-500 uppercase">
                Work With Me
              </span>
            </button>
          </div>

          {/* MOBILE: Hamburger */}
          <button 
            className="lg:hidden relative z-50 p-2 -mr-2 outline-none mix-blend-difference"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-[22px] h-[10px] flex flex-col justify-between items-end">
              <motion.span 
                animate={{ 
                    rotate: mobileMenuOpen ? 45 : 0, 
                    y: mobileMenuOpen ? 5 : 0,
                    width: mobileMenuOpen ? '22px' : '22px'
                }}
                className="w-full h-[1px] bg-[#F5F5F7] origin-center transition-all duration-500 ease-[0.2,0.65,0.3,0.9]"
              />
              <motion.span 
                animate={{ 
                    rotate: mobileMenuOpen ? -45 : 0, 
                    y: mobileMenuOpen ? -4 : 0,
                    width: mobileMenuOpen ? '22px' : '14px'
                }}
                className="h-[1px] bg-[#F5F5F7] origin-center transition-all duration-500 ease-[0.2,0.65,0.3,0.9]"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU FULLSCREEN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="fixed inset-0 z-40 bg-sulva-black/70 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center space-y-10 w-full px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.2, 0.65, 0.3, 0.9] }}
                  onClick={() => scrollToSection(link)}
                  className="text-4xl sm:text-5xl font-light tracking-tight text-[#F5F5F7] hover:text-white transition-colors outline-none"
                >
                  {link}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                onClick={() => scrollToSection('contact')}
                className="mt-12 group relative px-10 py-4 bg-white/5 border border-sulva-gold/20 rounded-full overflow-hidden transition-all duration-500 hover:border-sulva-gold/50 hover:bg-white/10 outline-none"
              >
                <span className="relative z-10 text-[13px] font-medium tracking-[0.2em] text-[#F5F5F7] uppercase">
                  Work With Me
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
