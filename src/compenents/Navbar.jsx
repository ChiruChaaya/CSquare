import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#4b6455]/80 backdrop-blur px-5 md:px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="font-bold font-serif text-xl md:text-2xl">
        <a href="#home">CSquare</a>
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-lg font-serif">
        <a href="#home" className="hover:opacity-80">Home</a>
        <a href="#about" className="hover:opacity-80">About</a>
        <a href="#services" className="hover:opacity-80">Services</a>
        <a href="#pricing" className="hover:opacity-80">Pricing</a>
        <a href="#contact" className="hover:opacity-80">Contact</a>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#4b6455]/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 text-lg font-serif md:hidden">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
