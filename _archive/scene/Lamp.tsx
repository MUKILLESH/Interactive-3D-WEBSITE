import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../materials';
import { createLampShade } from '../geometry';
import { useInteraction } from '../interaction/useInteraction';
import { usePortfolioStore } from '../state/usePortfolioStore';

export function Lamp() {
  const toggleLamp = usePortfolioStore((s) => s.toggleLamp);
  const lampOn = usePortfolioStore((s) => s.lampOn);
  const { hovered, handlers } = useInteraction('LAMP', toggleLamp);
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const shadeRef = useRef<THREE.Mesh>(null);

  const shadeGeo = useMemo(() => createLampShade(0.06, 0.14, 0.16), []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Subtle tilt on hover
    const targetTilt = hovered ? -0.06 : 0;
    groupRef.current.rotation.z += (targetTilt - groupRef.current.rotation.z) * 0.06;

    // Light intensity animation
    if (lightRef.current) {
      const targetIntensity = lampOn ? 3.0 : 0;
      lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.05;
    }

    // Shade emissive when on
    if (shadeRef.current) {
      const mat = shadeRef.current.material as THREE.MeshStandardMaterial;
      const targetEmissive = lampOn ? 0.3 : 0;
      mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[3.0, 0.755, -2.1]} {...handlers}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.03, 16]} />
        <meshStandardMaterial color={'#1A1A1A'} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.35, 8]} />
        <meshStandardMaterial color={'#1A1A1A'} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Arm — angled */}
      <mesh position={[0.08, 0.37, 0]} rotation={[0, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
        <meshStandardMaterial color={'#1A1A1A'} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Shade */}
      <mesh
        ref={shadeRef}
        geometry={shadeGeo}
        position={[0.14, 0.42, 0]}
        rotation={[0, 0, -0.15]}
        castShadow
      >
        <meshStandardMaterial
          color={PALETTE.linen}
          roughness={0.85}
          emissive={PALETTE.lampWarm}
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Practical light */}
      <pointLight
        ref={lightRef}
        position={[0.14, 0.38, 0]}
        color={PALETTE.lampWarm}
        intensity={0}
        distance={5}
        decay={2}
        castShadow={false}
      />
    </group>
  );
}
