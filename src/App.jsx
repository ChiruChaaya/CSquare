// src/App.jsx
import { useState } from 'react';

import SplashScreen     from './compenents/Splash/SplashScreen';
import CustomCursor     from './compenents/Cursor/CustomCursor';
import SmoothScroll     from './compenents/SmoothScroll/SmoothScroll';
import GlobalBackground from './compenents/GlobalBackground/GlobalBackground';
import MorphIconScene   from './compenents/MorphIcon/MorphIconScene';
import Navbar           from './compenents/Navbar';
import MusicPlayer      from './compenents/MusicPlayer';

import Home       from './sections/Home';
import About      from './sections/About';
import Service    from './sections/Service';
import Prices     from './sections/Prices';
import ComboPacks from './sections/ComboPacks';
import Contact    from './sections/Contact';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <CustomCursor />

      <SmoothScroll>
        {!splashDone && (
          <SplashScreen onComplete={() => setSplashDone(true)} />
        )}

        <div
          style={{
            opacity: splashDone ? 1 : 0,
            transition: 'opacity 0.8s ease',
            position: 'relative',
            background: '#000000',
            minHeight: '100vh',
          }}
        >
          {/* z-index 1 — ambient 2500 particles, mouse interaction, scroll parallax */}
          <GlobalBackground />

          {/* z-index 2 — morphing icon particles per section */}
          {splashDone && <MorphIconScene />}

          <Navbar />
          <MusicPlayer />

          {/* z-index 3 — all section content */}
          <main style={{ position: 'relative', zIndex: 3 }}>
            <Home />
            <About />
            <Service />
            <Prices />
            <ComboPacks />
            <Contact />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}