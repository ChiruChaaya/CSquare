import { motion, scale } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-100vh px-8 py-15 scroll-mt-24 bg-gradient-to-b from-[#183A3B] to-[#183a3a] flex items-center">
        <motion.div
        initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{scale:1.2}}
          transition={{ duration: 0.8 }} className=""  >
          <img src="public/WhatsApp Image 2026-01-19 at 7.23.10 PM.jpeg"/>
        </motion.div>
      <div className="max-w-3xl mx-auto text-center text-white">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-serif font-extrabold leading-tight">
          We Build Powerful Digital Experiences That Grow Your Business
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg font-sans text-slate-300"
        >
          From stunning websites to strategic digital marketing, we help brands
          stand out and scale online with results that matter.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4">
          <a
            href="#contact"
            className="bg-[#4b6455] hover:bg-[#639276] text-white px-8 py-3 rounded-xl font-semibold">
            Get Started
          </a>

          <a
            href="#services"
            className="border border-[#4b6455] text-[#87caa2] hover:bg-[#639276] hover:text-white px-8 py-3 rounded-xl font-semibold">
            See Our Work
          </a>
        </motion.div>

      </div>
      
    </section>
  );
}
