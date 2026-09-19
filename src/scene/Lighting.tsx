import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { usePortfolioStore } from '../state/usePortfolioStore';
import type { TimeOfDay } from '../state/usePortfolioStore';

const LIGHT_STATES: Record<TimeOfDay, {
  ambient: string;
  ambientInt: number;
  sun: string;
  sunInt: number;
  sunPos: [number, number, number];
  fill: string;
  fillInt: number;
  hemiSky: string;
  hemiGround: string;
  hemiInt: number;
}> = {
  MORNING: {
    ambient: '#F4EBDD',
    ambientInt: 0.28,
    sun: '#FFFAF0',
    sunInt: 2.85,
    sunPos: [5.2, 6.4, -3.6],
    fill: '#b7c6da',
    fillInt: 0.22,
    hemiSky: '#f7ead4',
    hemiGround: '#4a3931',
    hemiInt: 0.72,
  },
  AFTERNOON: {
    ambient: '#ffffff',
    ambientInt: 0.34,
    sun: '#fff7ec',
    sunInt: 2.35,
    sunPos: [4.2, 7.2, -2.8],
    fill: '#c5d0e0',
    fillInt: 0.26,
    hemiSky: '#f3eee6',
    hemiGround: '#534338',
    hemiInt: 0.68,
  },
  SUNSET: {
    ambient: '#DFA58C',
    ambientInt: 0.38,
    sun: '#FF8C42',
    sunInt: 2.7,
    sunPos: [5.4, 1.8, -4.1],
    fill: '#6a7ea3',
    fillInt: 0.18,
    hemiSky: '#f0b48a',
    hemiGround: '#3d2a24',
    hemiInt: 0.58,
  },
  NIGHT: {
    ambient: '#1A202C',
    ambientInt: 0.16,
    sun: '#4A5568',
    sunInt: 0.35,
    sunPos: [2.1, 4.2, -2.0],
    fill: '#3d4d6a',
    fillInt: 0.12,
    hemiSky: '#1c2433',
    hemiGround: '#121018',
    hemiInt: 0.22,
  },
};

export const Lighting = () => {
  const { timeOfDay, lampOn } = usePortfolioStore();

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const lampRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const windowRef = useRef<THREE.RectAreaLight>(null);

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);

  const sunColor = useMemo(() => new THREE.Color(), []);
  const ambientColor = useMemo(() => new THREE.Color(), []);
  const fillColor = useMemo(() => new THREE.Color(), []);
  const hemiSky = useMemo(() => new THREE.Color(), []);
  const hemiGround = useMemo(() => new THREE.Color(), []);
  const sunPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const targetState = LIGHT_STATES[timeOfDay as TimeOfDay];
    const k = 1 - Math.exp(-delta * 1.55);
    const t = state.clock.getElapsedTime();

    if (ambientRef.current) {
      ambientRef.current.color.lerp(ambientColor.set(targetState.ambient), k);
      ambientRef.current.intensity = THREE.MathUtils.damp(ambientRef.current.intensity, targetState.ambientInt, 2.1, delta);
    }

    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(sunColor.set(targetState.sun), k);
      dirLightRef.current.intensity = THREE.MathUtils.damp(dirLightRef.current.intensity, targetState.sunInt, 2.1, delta);
      dirLightRef.current.position.lerp(sunPos.set(...targetState.sunPos), k);
    }

    if (fillRef.current) {
      fillRef.current.color.lerp(fillColor.set(targetState.fill), k);
      const breathe = 1 + Math.sin(t * 0.28) * 0.06;
      fillRef.current.intensity = THREE.MathUtils.damp(fillRef.current.intensity, targetState.fillInt * breathe, 1.8, delta);
    }

    if (hemiRef.current) {
      hemiRef.current.color.lerp(hemiSky.set(targetState.hemiSky), k);
      hemiRef.current.groundColor.lerp(hemiGround.set(targetState.hemiGround), k);
      hemiRef.current.intensity = THREE.MathUtils.damp(hemiRef.current.intensity, targetState.hemiInt, 2.1, delta);
    }

    if (lampRef.current) {
      const flicker = lampOn ? 0.92 + Math.sin(t * 2.15) * 0.04 + Math.sin(t * 7.3) * 0.012 : 0;
      lampRef.current.intensity = THREE.MathUtils.damp(lampRef.current.intensity, flicker, 4.5, delta);
    }

    if (windowRef.current) {
      const windowInt = timeOfDay === 'NIGHT' ? 0.4 : timeOfDay === 'SUNSET' ? 6.5 : 4.2;
      windowRef.current.intensity = THREE.MathUtils.damp(windowRef.current.intensity, windowInt, 2.0, delta);
    }
  });

  return (
    <group>

      <hemisphereLight ref={hemiRef} color="#f6e6cf" groundColor="#4a3931" intensity={0.65} />
      <ambientLight ref={ambientRef} color="#ffffff" intensity={0.22} />

      <directionalLight
        ref={dirLightRef}
        color="#ffebd6"
        intensity={2.4}
        position={[5, 10, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00012}
        shadow-normalBias={0.03}
        shadow-radius={8}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <directionalLight ref={fillRef} color="#b8c6da" intensity={0.2} position={[-5, 4, 5]} />
      <directionalLight color="#ffe7c4" intensity={0.28} position={[0.4, 3.2, -7.5]} />

      <rectAreaLight
        ref={windowRef}
        color="#fff1d4"
        intensity={4.2}
        width={2.4}
        height={2.6}
        position={[0.45, 0.85, -2.72]}
        rotation={[0, Math.PI, 0]}
      />

      <pointLight
        ref={lampRef}
        color="#ffd6a0"
        intensity={0}
        position={[-2, 0.25, 0.8]}
        distance={5.5}
        decay={2}
      />

      <Environment resolution={256} environmentIntensity={0.34}>
        <Lightformer form="rect" intensity={1.35} color="#fff1d6" position={[3, 5, 3]} scale={[5, 5, 1]} />
        <Lightformer form="rect" intensity={0.62} color="#9eb9db" position={[-4, 2, -3]} rotation={[0, Math.PI / 2, 0]} scale={[3, 3, 1]} />
        <Lightformer form="ring" intensity={0.35} color="#ffe6c4" position={[0, 6, 0]} scale={8} />
      </Environment>
    </group>
  );
};
