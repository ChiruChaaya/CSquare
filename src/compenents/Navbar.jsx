export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#4b6455]/80 backdrop-blur px-8 py-5 flex justify-between">
      <div className="flex items-center gap-3">
      <h1 className="font-bold font-serif text-2xl">CSquare</h1>
 </div>
      <div className="space-x-6 text-xl font-serif">
        <a href="#home">Home</a>
         <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
