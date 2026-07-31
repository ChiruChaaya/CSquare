import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Smooth scroll to section using Lenis
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setOpen(false); // Close mobile menu

    const target = document.querySelector(id);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, {
        offset: -80, // Offset for fixed navbar
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (target) {
      // Fallback to native scroll if Lenis not ready
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="font-bold font-serif text-xl md:text-2xl">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
        >
          CSquare
        </a>
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-lg font-serif">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="hover:opacity-80 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 text-lg font-serif md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="hover:opacity-80 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}