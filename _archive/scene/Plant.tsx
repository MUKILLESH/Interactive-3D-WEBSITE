import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../materials';
import { createLeaf } from '../geometry';
import { useInteraction } from '../interaction/useInteraction';

export function Plant() {
  const { hovered, handlers } = useInteraction('PLANT');
  const leavesRef = useRef<THREE.Group>(null);

  const leafGeo = useMemo(() => createLeaf(0.22, 0.08, 0.1), []);
  const leafGeoLarge = useMemo(() => createLeaf(0.3, 0.11, 0.14), []);

  // Sway animation
  useFrame((state) => {
    if (!leavesRef.current) return;
    const t = state.clock.elapsedTime;
    const swayAmount = hovered ? 0.06 : 0.02;
    leavesRef.current.rotation.z = Math.sin(t * 1.5) * swayAmount;
    leavesRef.current.rotation.x = Math.cos(t * 1.2 + 0.5) * swayAmount * 0.5;
  });

  const leafColor = PALETTE.plantGreen;
  const leafDark = PALETTE.plantDark;

  return (
    <group position={[-3.0, 0, 1.8]} {...handlers}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.3, 16]} />
        <meshStandardMaterial color={PALETTE.terracotta} roughness={0.85} />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.2, 0.19, 0.03, 16]} />
        <meshStandardMaterial color={PALETTE.terracotta} roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
        <meshStandardMaterial color={'#5C4A3A'} roughness={1} />
      </mesh>

      {/* Stem & Leaves group */}
      <group ref={leavesRef} position={[0, 0.3, 0]}>
        {/* Main stem */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.4, 6]} />
          <meshStandardMaterial color={'#5A6B48'} roughness={0.8} />
        </mesh>

        {/* Leaves — arranged naturally */}
        <mesh geometry={leafGeoLarge} position={[0.05, 0.35, 0.02]} rotation={[0.2, 0.4, 0.3]} castShadow>
          <meshStandardMaterial color={leafColor} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeo} position={[-0.06, 0.28, -0.04]} rotation={[-0.15, -0.8, -0.2]} castShadow>
          <meshStandardMaterial color={leafDark} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeoLarge} position={[0.02, 0.4, -0.06]} rotation={[0.3, 1.2, 0.1]} castShadow>
          <meshStandardMaterial color={leafColor} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeo} position={[-0.04, 0.32, 0.05]} rotation={[-0.1, -1.5, -0.15]} castShadow>
          <meshStandardMaterial color={leafColor} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeo} position={[0.07, 0.25, -0.02]} rotation={[0.1, 2.0, 0.25]} castShadow>
          <meshStandardMaterial color={leafDark} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeoLarge} position={[-0.03, 0.38, 0.04]} rotation={[0.15, -2.5, -0.1]} castShadow>
          <meshStandardMaterial color={leafColor} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        {/* Extra small leaves */}
        <mesh geometry={leafGeo} position={[0.04, 0.42, 0.01]} rotation={[0.4, 0.8, 0.2]} castShadow>
          <meshStandardMaterial color={leafColor} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
