import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, ContactShadows, Preload } from '@react-three/drei';
import { Bloom, EffectComposer, N8AO, SMAA, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import { Model as Room } from './scene/RoomGLB';
import { CameraController } from './interaction/CameraController';
import { Lighting } from './scene/Lighting';
import { Atmosphere } from './scene/Atmosphere';
import SectionOverlay from './components/SectionOverlay';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import AccessibilityFallback from './components/AccessibilityFallback';
import { usePortfolioStore } from './state/usePortfolioStore';

function App() {
  const { isLoading, setIsLoading } = usePortfolioStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen />}

      <Navigation />
      <SectionOverlay />
      <AccessibilityFallback />

      <Canvas
        shadows="soft"
        orthographic
        dpr={[1, 2]}
        camera={{ position: [7, 6, 7], zoom: 125, near: -100, far: 500 }}
        gl={{
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
      >
        <color attach="background" args={['#d8d0c0']} />
        <Lighting />
        <Suspense fallback={null}>
          <Room />
          <CameraController />
          <Atmosphere />
          <ContactShadows
            position={[0, -1.94, 0]}
            opacity={0.42}
            scale={11}
            blur={2.8}
            far={5}
            color="#2a1d18"
            frames={1}
          />
          <Preload all />
        </Suspense>

        <AdaptiveDpr />
      </Canvas>

      <div className="film-grain" />
      <div className="cinematic-vignette" />
    </div>
  );
}

export default App;
