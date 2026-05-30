import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './compenents/splash.jsx'; // Import the file
import ContactSection from './sections/Contact';
import PricingSection from './sections/Prices';
import Hero from './sections/Home';
import Navbar from './compenents/Navbar';
import About from './sections/About';
import ServicesGallery from './sections/Service';
import ComboPacks from './sections/ComboPacks.jsx';
import MusicPlayer from "./compenents/MusicPlayer";

// Import your other sections

function App() {
  // State to track if loading is finished
  const [isLoading, setIsLoading] = useState(true);

  return (
    
    <div className="bg-neutral-950 min-h-screen text-white">
      <audio id="background-music" loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
      
      {/* AnimatePresence allows the Splash to animate OUT when removed */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ONLY SHOW WEBSITE AFTER LOADING */}
      {!isLoading && (
        <main>
          <MusicPlayer/>
          <Navbar />
          <Hero />
          <About/>
          <ServicesGallery/>
          <PricingSection/>
          <ComboPacks/>
          <ContactSection/>
      
        </main>
      )}

    </div>
  );
}

export default App;