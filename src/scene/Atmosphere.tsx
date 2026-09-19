import { useMemo, useRef } from 'react';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../state/usePortfolioStore';
import type { TimeOfDay } from '../state/usePortfolioStore';

const WASH: Record<TimeOfDay, { color: string; opacity: number }> = {
  MORNING: { color: '#fff4d8', opacity: 0.16 },
  AFTERNOON: { color: '#fff8ea', opacity: 0.12 },
  SUNSET: { color: '#ffb07a', opacity: 0.22 },
  NIGHT: { color: '#8aa4c8', opacity: 0.04 },
};

function WindowWash() {
  const { timeOfDay } = usePortfolioStore();
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const color = useMemo(() => new THREE.Color(WASH.MORNING.color), []);
  const targetColor = useMemo(() => new THREE.Color(WASH.MORNING.color), []);

  useFrame((_, delta) => {
    const target = WASH[timeOfDay];
    const k = 1 - Math.exp(-delta * 1.6);
    if (!materialRef.current) return;
    color.lerp(targetColor.set(target.color), k);
    materialRef.current.color.copy(color);
    materialRef.current.opacity = THREE.MathUtils.damp(materialRef.current.opacity, target.opacity, 2.2, delta);
  });

  return (
    <mesh position={[0.42, 0.92, -2.58]} renderOrder={2}>
      <planeGeometry args={[2.05, 2.35]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#fff4d8"
        transparent
        opacity={0.16}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function Atmosphere() {
  const { timeOfDay, lampOn } = usePortfolioStore();
  const night = timeOfDay === 'NIGHT';

  return (
    <group>
      <WindowWash />
      <Sparkles
        count={night ? 40 : 90}
        scale={[5.4, 3.6, 5.2]}
        size={night ? 1.6 : 1.15}
        speed={0.18}
        opacity={night ? 0.18 : 0.28}
        color={night ? '#d7e4ff' : '#fff6e4'}
        position={[0.2, -0.2, 0]}
      />
      {lampOn && (
        <Sparkles
          count={18}
          scale={[1.4, 1.1, 1.4]}
          size={2.1}
          speed={0.22}
          opacity={0.35}
          color="#ffd7a0"
          position={[-2.0, -0.15, 0.82]}
        />
      )}
    </group>
  );
}
