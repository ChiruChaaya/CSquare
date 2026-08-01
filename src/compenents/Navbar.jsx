// src/compenents/Navbar.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const NAV_LINKS = [
  { id: '01', label: 'About',    section: 'about'    },
  { id: '02', label: 'Services', section: 'services' },
  { id: '03', label: 'Pricing',  section: 'pricing'  },
  { id: '04', label: 'Bundles',  section: 'combos'   },
  { id: '05', label: 'Contact',  section: 'contact'  },
];

// ─── Full-screen menu overlay ─────────────────────────────────────────────────
function FullMenu({ isOpen, onClose }) {
  const overlayRef  = useRef(null);
  const linksRef    = useRef([]);
  const metaRef     = useRef(null);
  const bgRef       = useRef(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Reveal overlay
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(
        bgRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' }
      );

      // Stagger in links
      gsap.set(linksRef.current, { y: '110%', opacity: 0 });
      gsap.to(linksRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Meta
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.7, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';

      gsap.to(linksRef.current, {
        y: '110%',
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.in',
      });
      gsap.to(bgRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        delay: 0.25,
        ease: 'power4.inOut',
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        },
      });
    }
  }, [isOpen]);

  const handleLinkClick = useCallback(
    (section) => {
      onClose();
      setTimeout(() => {
        window.lenis?.scrollTo(document.querySelector(`#${section}`), {
          offset: -80,
          duration: 1.5,
        });
      }, 700);
    },
    [onClose]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] hidden items-stretch"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {/* Solid bg */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ background: '#000000' }}
      />

      {/* Content */}
      <div className="relative w-full flex flex-col justify-between px-6 md:px-12 pt-28 pb-12">

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <div key={link.id} className="overflow-hidden">
              <button
                ref={(el) => (linksRef.current[i] = el)}
                onClick={() => handleLinkClick(link.section)}
                className="flex items-baseline gap-6 group w-full text-left py-2 transition-colors duration-200 cursor-none"
                data-cursor="button"
              >
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{ color: 'rgba(217,232,165,0.4)' }}
                >
                  {link.id}
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#D9E8A5]"
                >
                  {link.label}
                </span>
              </button>
            </div>
          ))}
        </nav>

        {/* Bottom meta */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 pt-6 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p
            className="text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            CSquare — The Piece Your Vision Needs
          </p>
          <p
            className="text-xs font-mono"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            hello@csquare.in
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── Hamburger button ─────────────────────────────────────────────────────────
function MenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-none"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      data-cursor="button"
    >
      <span
        className="block w-6 h-px transition-all duration-400"
        style={{
          background: isOpen ? '#D9E8A5' : 'rgba(255,255,255,0.8)',
          transform: isOpen ? 'translateY(5px) rotate(45deg)' : 'none',
        }}
      />
      <span
        className="block h-px transition-all duration-400"
        style={{
          background: isOpen ? '#D9E8A5' : 'rgba(255,255,255,0.8)',
          width: isOpen ? '1.5rem' : '1rem',
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        className="block w-6 h-px transition-all duration-400"
        style={{
          background: isOpen ? '#D9E8A5' : 'rgba(255,255,255,0.8)',
          transform: isOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
        }}
      />
    </button>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [atTop, setAtTop]           = useState(true);
  const navRef                      = useRef(null);
  const lastScrollY                 = useRef(0);

  // Hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop  = currentY < 60;

      setAtTop(isAtTop);

      if (!menuOpen) {
        if (currentY > lastScrollY.current && currentY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const scrollToSection = useCallback((section) => {
    window.lenis?.scrollTo(document.querySelector(`#${section}`), {
      offset: -80,
      duration: 1.5,
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.lenis?.scrollTo(0, { duration: 1.5 });
  }, []);

  return (
    <>
      <FullMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9997] flex items-center justify-between px-6 md:px-12 transition-all duration-500"
        style={{
          height: '72px',
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
          background: atTop && !menuOpen
            ? 'transparent'
            : 'rgba(0,0,0,0.75)',
          backdropFilter: atTop && !menuOpen ? 'none' : 'blur(16px)',
          borderBottom: atTop && !menuOpen
            ? '1px solid transparent'
            : '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="cursor-none"
          data-cursor="button"
        >
          <img
            src="/csquarelogo.png"
            alt="CSquare"
            className="h-7 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.section)}
              className="text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#D9E8A5] cursor-none"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              data-cursor="button"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 hover:bg-[#D9E8A5] hover:text-black hover:border-[#D9E8A5]"
            style={{
              borderColor: 'rgba(217,232,165,0.3)',
              color: '#D9E8A5',
            }}
            data-cursor="button"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Let&rsquo;s talk →
          </a>

          <MenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen((p) => !p)}
          />
        </div>
      </nav>
    </>
  );
}