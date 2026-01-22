import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from 'D:/CSqaure/src/compenents/splash.jsx'; // Import the file
import ContactSection from './sections/Contact';
import PricingSection from './sections/Prices';
import Hero from './sections/Home';
import Navbar from './compenents/Navbar';
import About from './sections/About';
import ServicesGallery from './sections/Service';

// Import your other sections

function App() {
  // State to track if loading is finished
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      
      {/* AnimatePresence allows the Splash to animate OUT when removed */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ONLY SHOW WEBSITE AFTER LOADING */}
      {!isLoading && (
        <main>
           <Navbar />
      <Hero />
      <About/>
      <ServicesGallery/>
      <PricingSection/>
      <ContactSection/>
        </main>
      )}

    </div>
  );
}

export default App;