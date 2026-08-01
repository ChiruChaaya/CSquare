// src/sections/Home.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [line1Ref, line2Ref, line3Ref, line4Ref];
      const splits = lines.map((ref) =>
        new SplitType(ref.current, { types: 'chars' })
      );

      splits.forEach((split) => {
        gsap.set(split.chars, { y: '110%', opacity: 0 });
      });

      const tl = gsap.timeline({ delay: 0.3 });

      splits.forEach((split, i) => {
        tl.to(
          split.chars,
          { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.02 },
          i * 0.15
        );
      });

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      tl.fromTo(
        buttonsRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );

      gsap.to('.scroll-indicator-arrow', {
        y: 8, repeat: -1, yoyo: true,
        duration: 1.2, ease: 'power1.inOut',
      });

      return () => splits.forEach((s) => s.revert());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex items-start pt-24 md:pt-20"
      style={{ background: 'transparent' }}
    >
      {/* Dark overlay — only darkens LEFT (text area) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.6) 35%,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0) 100%
          )`,
          zIndex: 1,
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,232,165,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,232,165,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.03,
          zIndex: 1,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 30% 50%,
            transparent 40%,
            rgba(0, 0, 0, 0.6) 100%
          )`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="text-left">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-6 md:mb-8"
              style={{ color: 'rgba(217, 232, 165, 0.5)' }}
            >
              — Digital Studio
            </motion.p>

            <h1 className="font-serif font-bold text-white leading-[0.95] tracking-tight mb-8 md:mb-10">
              <div className="overflow-hidden">
                <div ref={line1Ref} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  We Build
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  ref={line2Ref}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    color: '#D9E8A5',
                    textShadow: '0 0 40px rgba(217, 232, 165, 0.3)',
                  }}
                >
                  Digital
                </div>
              </div>
              <div className="overflow-hidden">
                <div ref={line3Ref} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Experiences
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  ref={line4Ref}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  that scale
                </div>
              </div>
            </h1>

            <p ref={taglineRef} className="text-base md:text-lg text-neutral-400 max-w-md mb-10 leading-relaxed">
              From stunning websites to strategic digital marketing, we help brands stand out and scale online with results that matter.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={handleScrollTo('#contact')}
                data-cursor-text="Contact"
                className="group relative px-8 py-4 rounded-full font-semibold overflow-hidden transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D9E8A5, #B5D080)',
                  color: '#0a1512',
                }}
              >
                <span className="relative flex items-center gap-2">
                  Get Started
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>

              <a
                href="#services"
                onClick={handleScrollTo('#services')}
                className="group px-8 py-4 rounded-full font-semibold border border-neutral-700 text-white hover:border-[#D9E8A5] transition-colors flex items-center justify-center gap-2"
              >
                Explore Services
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'rgba(217, 232, 165, 0.4)' }}>
          Scroll
        </span>
        <div
          className="scroll-indicator-arrow w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(217,232,165,0.4), transparent)' }}
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-full h-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
        <div className="absolute top-0 right-0 h-full w-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
      </div>
    </section>
  );
}