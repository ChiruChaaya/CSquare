// src/App.jsx
import { useState } from 'react';

import SplashScreen        from './compenents/Splash/SplashScreen';
import CustomCursor        from './compenents/Cursor/CustomCursor';
import SmoothScroll        from './compenents/SmoothScroll/SmoothScroll';
import GlobalBackground    from './compenents/GlobalBackground/GlobalBackground';
import MorphIconScene      from './compenents/MorphIcon/MorphIconScene';
import Navbar              from './compenents/Navbar';
import MusicPlayer         from './compenents/MusicPlayer';

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

      {/* ✅ MusicPlayer renders IMMEDIATELY so audio element exists in DOM.
          The button will be hidden by splash overlay anyway. */}
      <MusicPlayer />

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
          <GlobalBackground />
          {splashDone && <MorphIconScene />}

          <Navbar />

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