import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import gsap from 'gsap';

function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Intro Sequence: Room itself is the hero. Minimal text.
    const tl = gsap.timeline();
    tl.to('.intro-text', { opacity: 1, duration: 1.5, delay: 0.5 })
      .to('.intro-text2', { opacity: 1, duration: 1, delay: 0.5 })
      .to('.intro-text', { opacity: 0, duration: 1, delay: 2 })
      .to('.intro-text2', { opacity: 0, duration: 1 }, '<')
      .to('.intro-bg', { opacity: 0, duration: 1.5, onComplete: () => setStarted(true) });
  }, []);

  return (
    <>
      {/* 3D Canvas - Cinematic isometric orthographic framing */}
      <Canvas shadows orthographic dpr={[1, 1.5]} camera={{ position: [15, 15, 15], zoom: 70, near: -100, far: 200 }}>
        <Suspense fallback={null}>
          <Scene started={started} />
        </Suspense>
      </Canvas>

      {/* DOM UI Layer */}
      <Overlay />

      {/* Intro Overlay */}
      {!started && (
        <div className="intro-bg" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#f9f6f0', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <h1 className="intro-text" style={{ opacity: 0, color: '#2a2622', fontWeight: 500, fontSize: '1.5rem', margin: 0, letterSpacing: '0.15em' }}>
            A small room for big ideas.
          </h1>
          <p className="intro-text2" style={{ opacity: 0, color: '#6a6258', fontWeight: 400, fontSize: '0.9rem', marginTop: '1rem', letterSpacing: '0.05em' }}>
            Everything here is interactive.
          </p>
        </div>
      )}
    </>
  );
}

export default App;
