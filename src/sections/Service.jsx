import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import puzzle from "../assets/images/puzzle.png";
import { services } from "../Data/ourservices.js";

/* Stagger configs remain unchanged */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

const ServicesGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="min-h-screen w-full bg-[#183A3B] text-white overflow-hidden scroll-mt-24"
    >
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-5 sm:px-8 md:px-20 py-12"
      >
        <h1 className="text-center font-bold uppercase tracking-widest text-emerald-500">
          <span className="block text-3xl sm:text-4xl md:text-6xl font-serif">
            Our Services
          </span>
        </h1>
      </motion.header>

      {/* BODY */}
      <div className="flex flex-col md:flex-row">
        {/* LEFT LIST */}
        <div className="w-full md:w-1/2 px-5 sm:px-8 md:px-20 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="space-y-6"
          >
            {services.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                <div
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(index)} // mobile friendly
                  onMouseEnter={() => setActiveIndex(index)} // desktop
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-emerald-400">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400">
                      {service.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h2>

                  <motion.p
                    initial={false}
                    animate={{
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    className="overflow-hidden mt-2 max-w-md text-sm leading-relaxed"
                  >
                    {service.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT IMAGE – DESKTOP ONLY */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-1/2 items-center justify-center p-12"
        >
          <div className="relative w-full h-[85%] rounded-xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={services[activeIndex].image}
                src={services[activeIndex].image}
                alt={services[activeIndex].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM DECORATION – DESKTOP ONLY */}
     
      <section className="flex gap-4 mx-auto justify-center bg-[#183A3B]">
      <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className=" rounded-xl  h-20 "/>
          <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className="rounded-xl  h-20 "/>
          <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className="rounded-xl  h-20 "/>
          </section>
    </section>
  );
};

export default ServicesGallery;
