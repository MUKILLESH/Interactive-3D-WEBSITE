import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../store';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

export function Lighting() {
  const { timeOfDay, lampOn } = useAppStore();
  
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.PointLight>(null);
  const lampLightRef = useRef<THREE.PointLight>(null);

  // We keep track of current target colors so we can smoothly transition the background color as well
  const targetAmbientColor = useRef(new THREE.Color());

  useEffect(() => {
    // Time of day presets
    const presets = {
      MORNING: { dirColor: '#FFFCF2', dirIntensity: 1.5, ambColor: '#FFD1A3', ambIntensity: 0.8 },
      AFTERNOON: { dirColor: '#FFFFFF', dirIntensity: 2.0, ambColor: '#E0EEF5', ambIntensity: 1.0 },
      SUNSET: { dirColor: '#FF9B63', dirIntensity: 1.2, ambColor: '#B87A65', ambIntensity: 0.6 },
      NIGHT: { dirColor: '#1A2A40', dirIntensity: 0.2, ambColor: '#0F1724', ambIntensity: 0.2 },
    };
    
    const target = presets[timeOfDay];
    targetAmbientColor.current.set(target.ambColor);

    if (dirLightRef.current) {
      gsap.to(dirLightRef.current, { intensity: target.dirIntensity, duration: 2.0, ease: 'power2.inOut' });
      gsap.to(dirLightRef.current.color, { 
        r: new THREE.Color(target.dirColor).r, 
        g: new THREE.Color(target.dirColor).g, 
        b: new THREE.Color(target.dirColor).b, 
        duration: 2.0 
      });
    }

    if (ambientLightRef.current) {
      gsap.to(ambientLightRef.current, { intensity: target.ambIntensity, duration: 2.0, ease: 'power2.inOut' });
      gsap.to(ambientLightRef.current.color, { 
        r: new THREE.Color(target.ambColor).r, 
        g: new THREE.Color(target.ambColor).g, 
        b: new THREE.Color(target.ambColor).b, 
        duration: 2.0 
      });
    }
  }, [timeOfDay]);

  useEffect(() => {
    if (lampLightRef.current) {
      gsap.to(lampLightRef.current, {
        intensity: lampOn ? 2.5 : 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [lampOn]);

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.001, delta); // frame-rate independent lerp
    // Smoothly animate background color based on ambient color to tie everything together
    state.scene.background = new THREE.Color().copy(ambientLightRef.current?.color || targetAmbientColor.current).multiplyScalar(0.2);
  });

  return (
    <>
      {/* Primary Directional Light (Sun) */}
      <directionalLight
        ref={dirLightRef}
        position={[8, 12, -8]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      >
        <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 0.1, 50]} />
      </directionalLight>
      
      {/* Subtle warm bounce light to fill shadows and act as fake GI */}
      <pointLight ref={ambientLightRef} position={[0, 1, 0]} distance={15} />

      {/* Desk Lamp Practical Light */}
      <pointLight 
        ref={lampLightRef}
        position={[2.4, 1.2, 3.8]} // Positioned near the procedural lamp
        color="#FFAA55"
        distance={6}
        castShadow
        intensity={0}
      />
    </>
  );
}
