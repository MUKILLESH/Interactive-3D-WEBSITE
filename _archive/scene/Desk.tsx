import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../materials';
import { useInteraction } from '../interaction/useInteraction';

export function Desk() {
  const { hovered, handlers } = useInteraction('LAPTOP');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = hovered ? 0.015 : 0;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.06;
  });

  return (
    <group ref={groupRef} position={[2.2, 0, -1.8]} {...handlers}>
      {/* Tabletop — slightly rounded via scale */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.7]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.75} />
      </mesh>
      {/* Tabletop edge detail */}
      <mesh position={[0, 0.695, 0]}>
        <boxGeometry args={[1.62, 0.01, 0.72]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>

      {/* Left legs — A-frame style */}
      <mesh position={[-0.68, 0.36, -0.25]} castShadow>
        <boxGeometry args={[0.04, 0.72, 0.04]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      <mesh position={[-0.68, 0.36, 0.25]} castShadow>
        <boxGeometry args={[0.04, 0.72, 0.04]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Left cross brace */}
      <mesh position={[-0.68, 0.22, 0]} castShadow>
        <boxGeometry args={[0.04, 0.04, 0.46]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>

      {/* Right legs */}
      <mesh position={[0.68, 0.36, -0.25]} castShadow>
        <boxGeometry args={[0.04, 0.72, 0.04]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.68, 0.36, 0.25]} castShadow>
        <boxGeometry args={[0.04, 0.72, 0.04]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Right cross brace */}
      <mesh position={[0.68, 0.22, 0]} castShadow>
        <boxGeometry args={[0.04, 0.04, 0.46]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>

      {/* Small drawer */}
      <mesh position={[0.5, 0.6, 0.01]} castShadow>
        <boxGeometry args={[0.55, 0.14, 0.48]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.78} />
      </mesh>
      {/* Drawer handle */}
      <mesh position={[0.5, 0.6, 0.26]}>
        <boxGeometry args={[0.12, 0.02, 0.015]} />
        <meshStandardMaterial color={PALETTE.charcoal} roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}
