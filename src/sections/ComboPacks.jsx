import React from 'react';
import { motion } from 'framer-motion';
import puzzle from "../assets/images/puzzle.png";
import { combinationPacks } from '../Data/combinationPacks.js';

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" }
  }
};

const fadeUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardStaggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardItemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

const ComboPacks = () => {
  return (
    <>
      <section
        id="combo-packs"
        className="relative w-full py-20 overflow-x-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#183A3B] pointer-events-none" />

        {/* Decorative glow elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10"
        >

          {/* Header */}
          <motion.div variants={fadeUpVariants} className="text-center mb-16">
            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
              Bundled & Discounted
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-serif text-white mt-3">
              Combination Packs
            </h2>
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
              Get more value with our curated service bundles — designed to give you everything you need at the best possible price.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={cardStaggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {combinationPacks.map((pack) => (
              <motion.div
                key={pack.id}
                variants={cardItemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                  pack.badge
                    ? 'bg-gradient-to-b from-emerald-900/40 to-neutral-900/60 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/20'
                    : 'bg-neutral-900/60 border border-white/10 hover:border-emerald-500/50'
                }`}
              >
                {/* Badge */}
                {pack.badge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-mono font-bold px-4 py-1 rounded-full tracking-widest shadow-lg"
                  >
                    {pack.badge}
                  </motion.div>
                )}

                {/* Pack Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">
                    {pack.name}
                  </h3>
                  <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider">
                    {pack.tagline}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      {pack.discountedPrice}
                    </span>
                    <span className="text-neutral-500 line-through text-lg">
                      {pack.originalPrice}
                    </span>
                  </div>
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full">
                    {pack.savings}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-6" />

                {/* Services List */}
                <div className="flex-1 mb-6">
                  <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider mb-4">
                    What's Included:
                  </p>
                  <ul className="space-y-3">
                    {pack.services.map((service, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-neutral-300 text-sm"
                      >
                        <svg
                          className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Best For Tag */}
                <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Best For:
                  </p>
                  <p className="text-sm text-white font-medium">
                    {pack.bestFor}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    pack.badge
                      ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/30'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-600'
                  }`}
                >
                  Get This Pack
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Call to Action */}
          <motion.div
            variants={fadeUpVariants}
            className="text-center mt-16"
          >
            <p className="text-neutral-400 mb-4">
              Need a custom combination? We'll build a pack just for you.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 rounded-xl border-2 border-emerald-500 text-emerald-400 font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              Request Custom Pack
            </motion.a>
          </motion.div>

        </motion.div>
      </section>

      {/* Bottom puzzle row – matching your Pricing section */}
      <section className="bg-[#183A3B] flex gap-2 sm:gap-4 mx-auto justify-center py-6">
        {[1, 2, 3].map((i) => (
          <motion.img
            key={i}
            whileHover={{ y: -10 }}
            src={puzzle}
            alt="Decoration"
            className="h-12 sm:h-16 md:h-20 rounded-xl"
          />
        ))}
      </section>
    </>
  );
};

export default ComboPacks;