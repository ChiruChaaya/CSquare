import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from 'D:/CSqaure/src/Data/ourservices.js'


// Stagger Animation Configuration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50 }
  }
};

const ServicesGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="services" className="flex flex-col h-screen w-full  bg-[#183A3B] text-white overflow-hidden scroll-mt-15">
      
      {/* HEADER: FIXED ANIMATION */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }} // Reduced movement
        whileInView={{ y: 0, opacity: 1 }}
        //viewport={{ once: true }} // Trigger immediately
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full px-8 md:px-20 py-6 shrink-0 z-30 border-b border-[#183A3B] bg-transparent"
      >
        <motion.div
         initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
           className="flex items-center justify-between -mb-15">
          <h1 className="text-6xl text-center mx-auto md:text-2xl font-bold uppercase tracking-widest text-emerald-500">
            <motion.span 
           
            className='text-7xl'>Our Services</motion.span>
          </h1>
        </motion.div>
      </motion.header>

      {/* BODY */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* LEFT SIDE: TEXT LIST */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 z-10">
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            {services.map((service, index) => (
              // 1. Entrance Animation Wrapper
              <motion.div key={service.id} variants={itemVariants}>
                
                {/* 2. Hover Interaction Wrapper */}
                <motion.div
                  className="cursor-pointer group"
                  onMouseEnter={() => setActiveIndex(index)}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 1,
                    x: activeIndex === index ? 10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono  text-emerald-400">0{index + 1}</span>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400">{service.category}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold font-serif group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h2>
                  
                  <motion.p 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0 
                    }}
                    className="overflow-hidden  mt-1 max-w-md text-sm leading-relaxed"
                  >
                    {service.description}
                  </motion.p>
                </motion.div>
                
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: IMAGE DISPLAY */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex w-full md:w-1/2 h-full relative items-center justify-center bg-transparent border-l border-[#183A3B] p-12"
        >
          
          <div className="relative w-full h-[85%] overflow-hidden rounded-xl shadow-2xl">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={services[activeIndex].image}
                src={services[activeIndex].image}
                alt={services[activeIndex].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default ServicesGallery;