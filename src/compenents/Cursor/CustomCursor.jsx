import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './cursor.css';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Instant dot follows mouse exactly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring follows with smooth spring physics
  const ringX = useSpring(dotX, {
    damping: 25,
    stiffness: 250,
    mass: 0.5,
  });
  const ringY = useSpring(dotY, {
    damping: 25,
    stiffness: 250,
    mass: 0.5,
  });

  useEffect(() => {
    let animationFrame;

    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // ─── Attach hover listeners to interactive elements ───
    const applyHoverListeners = () => {
      // Standard interactive elements
      const buttons = document.querySelectorAll('button, a');
      buttons.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorVariant('button'));
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default');
          setCursorText('');
        });
      });

      // Elements with data-cursor="text"
      const textElements = document.querySelectorAll('[data-cursor="text"]');
      textElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('text');
          setCursorText(el.getAttribute('data-cursor-text') || '');
        });
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default');
          setCursorText('');
        });
      });

      // Elements with data-cursor="view" (for project previews)
      const viewElements = document.querySelectorAll('[data-cursor="view"]');
      viewElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('view');
          setCursorText(el.getAttribute('data-cursor-text') || 'View');
        });
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default');
          setCursorText('');
        });
      });

      // Elements with data-cursor="hide" (hide cursor)
      const hideElements = document.querySelectorAll('[data-cursor="hide"]');
      hideElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorVariant('hidden'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Apply listeners after DOM is ready
    const listenerTimeout = setTimeout(applyHoverListeners, 500);

    // Reapply when new elements are added (for dynamic content)
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(applyHoverListeners);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      clearTimeout(listenerTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [dotX, dotY, isVisible]);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.documentElement.classList.add('has-touch');
    }
  }, []);

  // Cursor size/style variants
const variants = {
  default: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(217, 232, 165, 0)',
    border: '1.5px solid rgba(217, 232, 165, 0.7)',
    mixBlendMode: 'difference',
  },
  button: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(217, 232, 165, 0.2)',
    border: '1.5px solid rgba(217, 232, 165, 1)',
    mixBlendMode: 'difference',
  },
  text: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(217, 232, 165, 0.9)',
    border: '1.5px solid rgba(217, 232, 165, 0)',
    mixBlendMode: 'normal',
  },
  view: {
    width: 110,
    height: 110,
    backgroundColor: 'rgba(217, 232, 165, 0.95)',
    border: '1.5px solid rgba(217, 232, 165, 0)',
    mixBlendMode: 'normal',
  },
  hidden: {
    width: 0,
    height: 0,
    backgroundColor: 'rgba(217, 232, 165, 0)',
    border: '0px solid rgba(217, 232, 165, 0)',
    opacity: 0,
  },
};

  const dotVariants = {
    default: { scale: 1, opacity: 1 },
    button: { scale: 0, opacity: 0 },
    text: { scale: 0, opacity: 0 },
    view: { scale: 0, opacity: 0 },
    hidden: { scale: 0, opacity: 0 },
  };

  return (
    <>
      {/* ─── Outer Ring — smooth follow ─── */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={variants[cursorVariant]}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.3,
        }}
      >
        {/* Text inside cursor */}
        {cursorText && (cursorVariant === 'text' || cursorVariant === 'view') && (
          <motion.span
            className="custom-cursor-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* ─── Center Dot — instant follow ─── */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={dotVariants[cursorVariant]}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}