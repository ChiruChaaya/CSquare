import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen px-4 sm:px-8 py-10 sm:py-15 scroll-mt-24 bg-gradient-to-b from-[#183A3B] to-[#183a3a] flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16"
    >
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src="/WhatsApp Image 2026-01-19 at 7.23.10 PM.jpeg"
          alt="Hero"
          className="w-full max-w-md md:max-w-lg rounded-xl shadow-2xl object-cover"
        />
      </motion.div>

      {/* Hero Text */}
      <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start text-white">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold leading-tight"
        >
          We Build Powerful Digital Experiences That Grow Your Business
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg font-sans text-slate-300 max-w-xl"
        >
          From stunning websites to strategic digital marketing, we help brands
          stand out and scale online with results that matter.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <a
            href="#contact"
            className="bg-[#4b6455] hover:bg-[#639276] text-white px-6 sm:px-8 py-3 sm:py-3 rounded-xl font-semibold text-center"
          >
            Get Started
          </a>

          <a
            href="#services"
            className="border border-[#4b6455] text-[#87caa2] hover:bg-[#639276] hover:text-white px-6 sm:px-8 py-3 sm:py-3 rounded-xl font-semibold text-center"
          >
            See Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
