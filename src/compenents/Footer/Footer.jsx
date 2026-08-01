// src/compenents/Footer/Footer.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Marquee strip ────────────────────────────────────────────────────────────
function Marquee() {
  const items = Array(8).fill('CSQUARE');

  return (
    <div
      className="relative w-full overflow-hidden py-5 border-y"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marqueeScroll 18s linear infinite' }}
      >
        {[...items, ...items].map((word, i) => (
          <span
            key={i}
            className="text-sm font-mono tracking-[0.4em] uppercase flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.1)' }}
          >
            {word}
            <span
              className="mx-6 text-xs"
              style={{ color: 'rgba(217,232,165,0.25)' }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Social icon ──────────────────────────────────────────────────────────────
function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D9E8A5]/40 group"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      data-cursor="button"
    >
      <span
        className="text-sm transition-colors duration-300 group-hover:text-[#D9E8A5]"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {children}
      </span>
    </a>
  );
}

// ─── Footer nav column ────────────────────────────────────────────────────────
function FooterCol({ title, links }) {
  return (
    <div>
      <p
        className="text-xs font-mono tracking-[0.3em] uppercase mb-5"
        style={{ color: 'rgba(217,232,165,0.45)' }}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href, section }) => (
          <li key={label}>
            <a
              href={href || `#${section}`}
              className="text-sm transition-colors duration-300 hover:text-white group inline-flex items-center gap-1"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              data-cursor="button"
              onClick={section ? (e) => {
                e.preventDefault();
                window.lenis?.scrollTo(document.querySelector(`#${section}`), {
                  offset: -80, duration: 1.5,
                });
              } : undefined}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef     = useRef(null);
  const colsRef    = useRef(null);

  const year = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading character reveal
      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.set(split.chars, { y: '110%', opacity: 0 });
      ScrollTrigger.create({
        trigger: headingRef.current, start: 'top 80%', once: true,
        onEnter: () =>
          gsap.to(split.chars, {
            y: '0%', opacity: 1, duration: 1.2, stagger: 0.02, ease: 'power4.out',
          }),
      });

      // CTA
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: ctaRef.current, start: 'top 85%', once: true,
          onEnter: () =>
            gsap.to(ctaRef.current, {
              y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: 'power3.out',
            }),
        });
      }

      // Columns
      if (colsRef.current) {
        gsap.set(colsRef.current, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: colsRef.current, start: 'top 88%', once: true,
          onEnter: () =>
            gsap.to(colsRef.current, {
              y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out',
            }),
        });
      }

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative w-full pt-24 md:pt-36"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Big CTA heading ──────────────────────────────────────── */}
        <div className="overflow-hidden mb-8">
          <h2
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.0] text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let&rsquo;s build
            <br />
            something{' '}
            <span style={{ color: '#D9E8A5' }}>great</span>
            <br />
            together.
          </h2>
        </div>

        {/* ── CTA button ───────────────────────────────────────────── */}
        <div ref={ctaRef} className="mb-20 md:mb-28">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ background: '#D9E8A5', color: '#000000' }}
            data-cursor="button"
            onClick={(e) => {
              e.preventDefault();
              window.lenis?.scrollTo(document.querySelector('#contact'), {
                offset: -80, duration: 1.5,
              });
            }}
          >
            Get In Touch
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div
          className="w-full h-px mb-16"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        />

        {/* ── 3-column links grid ───────────────────────────────────  */}
        <div
          ref={colsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16"
        >
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <img
              src="/csquarelogo.png"
              alt="CSquare"
              className="h-7 w-auto object-contain object-left opacity-80"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p
              className="text-xs leading-relaxed max-w-[200px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              The piece your vision needs.
              <br />
              Premium digital studio.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5 mt-1">
              <SocialLink href="https://instagram.com" label="Instagram">
                IG
              </SocialLink>
              <SocialLink href="https://twitter.com" label="Twitter/X">
                X
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                in
              </SocialLink>
              <SocialLink href="https://github.com/ChiruChaaya/CSquare" label="GitHub">
                GH
              </SocialLink>
            </div>
          </div>

          <FooterCol
            title="Services"
            links={[
              { label: 'AI Automation',     section: 'services' },
              { label: 'CRM Systems',       section: 'services' },
              { label: 'Web Development',   section: 'services' },
              { label: 'Cyber Security',    section: 'services' },
              { label: 'Digital Marketing', section: 'services' },
              { label: 'Brand Experience',  section: 'services' },
            ]}
          />

          <FooterCol
            title="Company"
            links={[
              { label: 'About Us',   section: 'about'   },
              { label: 'Pricing',    section: 'pricing'  },
              { label: 'Bundles',    section: 'combos'  },
              { label: 'Contact',    section: 'contact' },
            ]}
          />

          <FooterCol
            title="Contact"
            links={[
              { label: 'hello@csquare.in',      href: 'mailto:hello@csquare.in' },
              { label: 'WhatsApp Us',            href: '#'                       },
              { label: 'Book Discovery Call',    href: '#'                       },
            ]}
          />
        </div>
      </div>

      {/* ── Marquee ──────────────────────────────────────────────────── */}
      <Marquee />

      {/* ── Copyright bar ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          © {year} CSquare. All rights reserved.
        </p>
        <p
          className="text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          v1.0.0 &nbsp;·&nbsp; Built with ♥ in India
        </p>
      </div>
    </footer>
  );
}