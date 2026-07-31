import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './compenents/Splash/SplashScreen.jsx';
import ContactSection from './sections/Contact';
import PricingSection from './sections/Prices';
import Hero from './sections/Home';
import Navbar from './compenents/Navbar';
import About from './sections/About';
import ServicesGallery from './sections/Service';
import ComboPacks from './sections/ComboPacks.jsx';
import MusicPlayer from "./compenents/MusicPlayer";
import CustomCursor from './compenents/Cursor/CustomCursor';
import SmoothScroll from './compenents/SmoothScroll/SmoothScroll';

// Import your other sections

function App() {
  // State to track if loading is finished
  const [isLoading, setIsLoading] = useState(true);

  return (
    
    <div className="bg-black min-h-screen text-white">
<audio id="background-music" loop preload="auto">
  <source src="/music/atlasaudio-hope-piano-509806.mp3" type="audio/mpeg" />
</audio>
        <CustomCursor />
      {/* AnimatePresence allows the Splash to animate OUT when removed */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ONLY SHOW WEBSITE AFTER LOADING */}
      {/* ONLY SHOW WEBSITE AFTER LOADING */}
{!isLoading && (
  <SmoothScroll>
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
  </SmoothScroll>
)}

    </div>
  );
}

export default App;