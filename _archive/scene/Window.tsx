import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from '../materials';
import { createCurtain } from '../geometry';
import { useInteraction } from '../interaction/useInteraction';
import { usePortfolioStore } from '../state/usePortfolioStore';
import { useFrame } from '@react-three/fiber';

export function Window() {
  const cycleTimeOfDay = usePortfolioStore((s) => s.cycleTimeOfDay);
  const timeOfDay = usePortfolioStore((s) => s.timeOfDay);
  const { hovered, handlers } = useInteraction('WINDOW', cycleTimeOfDay);
  const glowRef = useRef<THREE.Mesh>(null);

  const curtainGeo = useMemo(() => createCurtain(0.55, 2.0, 5, 0.04), []);

  // Sky color based on time of day
  const skyColors: Record<string, string> = {
    MORNING: '#B8D4E8',
    AFTERNOON: '#A8CCE8',
    SUNSET: '#E8A878',
    NIGHT: '#1A2040',
  };

  useFrame(() => {
    if (!glowRef.current) return;
    const mat = glowRef.current.material as THREE.MeshStandardMaterial;
    const targetColor = new THREE.Color(skyColors[timeOfDay]);
    mat.color.lerp(targetColor, 0.03);
    mat.emissive.lerp(targetColor, 0.03);
    const isDay = timeOfDay !== 'NIGHT';
    const targetIntensity = isDay ? (hovered ? 0.6 : 0.4) : 0.1;
    mat.emissiveIntensity += (targetIntensity - mat.emissiveIntensity) * 0.05;
  });

  return (
    <group position={[-3.87, 1.8, -1.5]} {...handlers}>
      {/* Window frame — outer */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 2.4, 1.8]} />
        <meshStandardMaterial color={PALETTE.offWhite} roughness={0.8} />
      </mesh>

      {/* Window opening — glass pane */}
      <mesh ref={glowRef} position={[0.01, 0, 0]}>
        <boxGeometry args={[0.02, 2.1, 1.5]} />
        <meshStandardMaterial
          color={skyColors.MORNING}
          emissive={skyColors.MORNING}
          emissiveIntensity={0.4}
          roughness={0.05}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Mullion — vertical center */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[0.03, 2.15, 0.04]} />
        <meshStandardMaterial color={PALETTE.offWhite} roughness={0.8} />
      </mesh>
      {/* Mullion — horizontal center */}
      <mesh position={[0.04, 0.2, 0]}>
        <boxGeometry args={[0.03, 0.04, 1.55]} />
        <meshStandardMaterial color={PALETTE.offWhite} roughness={0.8} />
      </mesh>

      {/* Curtain rod */}
      <mesh position={[0.15, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 2.2, 8]} />
        <meshStandardMaterial color={'#2A2622'} roughness={0.35} metalness={0.7} />
        {/* Rod rotated to horizontal along Z */}
      </mesh>

      {/* Left curtain */}
      <mesh geometry={curtainGeo} position={[0.12, 0.15, -0.7]} castShadow>
        <meshStandardMaterial color={PALETTE.linen} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
      {/* Right curtain */}
      <mesh geometry={curtainGeo} position={[0.12, 0.15, 0.7]} castShadow>
        <meshStandardMaterial color={PALETTE.linen} roughness={0.92} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
