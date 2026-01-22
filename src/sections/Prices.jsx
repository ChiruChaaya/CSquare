import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pricingCategories } from '../Data/ourservices';

// --- CSS TO HIDE SCROLLBARS ---
const hideScrollbarStyle = `
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
`;

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const fadeUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardItemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 }, 
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

const PricingSection = () => {
  const [activeCategory, setActiveCategory] = useState(pricingCategories[0]);
  
  // Scroll Logic
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check if we need scrolling (More than 3 cards)
  const isScrollableMode = activeCategory.plans.length > 3;

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
  }, [activeCategory]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <section id='pricing' className="relative w-full py-20  overflow-x-hidden min-h-screen flex flex-col justify-center">
      
      <style>{hideScrollbarStyle}</style>

      {/* --- BACKGROUND COLOR CHANGE HERE --- */}
      {/* Changed color to #183A3B and opacity to /50 for a richer, darker look */}
      <div className="absolute inset-0 bg-[#183A3B] pointer-events-none" />

      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10"
      >
        
        {/* HEADER */}
        <motion.div variants={fadeUpVariants} className="text-center mb-12">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
            Invest within your budget
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mt-3">
            Pricing Plans
          </h2>
        </motion.div>

        {/* TABS */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex justify-start md:justify-center overflow-x-auto pb-8 mb-4 scrollbar-hide px-4"
        >
          <div className="flex space-x-2 bg-[#4b6455]/80 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            {pricingCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory.id === cat.id ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {activeCategory.id === cat.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#183A3B] rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* CARDS CONTAINER */}
        <div className="relative group/carousel">
          
          {/* ARROWS */}
          <AnimatePresence>
            {isScrollableMode && showLeftArrow && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-all text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </motion.button>
            )}
            {isScrollableMode && showRightArrow && (
               <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-all text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* SCROLL AREA */}
          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className={`
              flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4
              ${isScrollableMode ? 'justify-start' : 'md:justify-center'} 
            `}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                className="contents" 
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardStaggerVariants}
              >
                {activeCategory.plans.map((plan, index) => (
                  <motion.div
                    key={`${activeCategory.id}-${index}`}
                    variants={cardItemVariants}
                    
                    className="flex-none w-[85%] md:w-[350px] snap-center flex flex-col p-8 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md hover:border-emerald-500/50 transition-colors group"
                  >
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-mono text-emerald-400 uppercase tracking-wider mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-neutral-500 text-sm">/ project</span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-emerald-500/30 transition-colors" />

                    <ul className="flex-1 space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                          <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all duration-300">
                      Choose Plan
                    </button>

                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </section>
    <section className="flex gap-4 mx-auto justify-center bg-[#183A3B]">
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className=" rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="rounded-xl  h-20 "/>
    </section>
    </>
  );
};

export default PricingSection;