import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // ─── Initialize Lenis ───
    const lenis = new Lenis({
      duration: 1.4,        // How long scroll takes (higher = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,   // Disable on touch (feels weird)
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,   // Speed of scroll
      lerp: 0.1,            // Linear interpolation (lower = smoother lag)
    });

    lenisRef.current = lenis;

    // ─── Connect Lenis to GSAP ScrollTrigger ───
    lenis.on('scroll', ScrollTrigger.update);

    // ─── RAF (Request Animation Frame) loop ───
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ─── Register with GSAP ticker for perfect sync ───
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ─── Expose lenis globally for scrolling to sections ───
    window.lenis = lenis;

    // ─── Cleanup ───
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}