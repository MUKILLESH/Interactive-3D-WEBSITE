import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../materials';
import { createSoftCushion, createDuvet } from '../geometry';
import { useInteraction } from '../interaction/useInteraction';

export function Bed() {
  const { hovered, isActive, handlers } = useInteraction('BED');
  const groupRef = useRef<THREE.Group>(null);
  const duvetRef = useRef<THREE.Mesh>(null);

  // Custom duvet geometry
  const duvetGeo = useMemo(() => createDuvet(2.0, 0.18, 1.6), []);
  // Pillow geometries
  const pillowGeo = useMemo(() => createSoftCushion(0.5, 0.12, 0.35, 0.4), []);

  // Hover animation
  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = hovered && !isActive ? 0.03 : 0;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;

    if (duvetRef.current) {
      const targetScale = hovered ? 0.97 : 1;
      duvetRef.current.scale.y += (targetScale - duvetRef.current.scale.y) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[-1.5, 0, 0.8]} {...handlers}>
      {/* Bed frame — headboard */}
      <mesh position={[0, 0.55, -0.85]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 1.1, 0.08]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Headboard top cap — rounded detail */}
      <mesh position={[0, 1.12, -0.85]} castShadow>
        <boxGeometry args={[2.35, 0.06, 0.1]} />
        <meshStandardMaterial color={PALETTE.darkWood} roughness={0.65} />
      </mesh>

      {/* Bed frame — side rails */}
      <mesh position={[-1.1, 0.22, 0]} castShadow>
        <boxGeometry args={[0.08, 0.44, 1.8]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      <mesh position={[1.1, 0.22, 0]} castShadow>
        <boxGeometry args={[0.08, 0.44, 1.8]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>

      {/* Bed frame — footboard */}
      <mesh position={[0, 0.32, 0.85]} castShadow>
        <boxGeometry args={[2.3, 0.64, 0.08]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>

      {/* Legs */}
      {[[-1.05, -0.82], [1.05, -0.82], [-1.05, 0.82], [1.05, 0.82]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.04, z]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color={PALETTE.darkWood} roughness={0.65} />
        </mesh>
      ))}

      {/* Mattress */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.32, 1.7]} />
        <meshStandardMaterial color={PALETTE.offWhite} roughness={0.95} />
      </mesh>

      {/* Duvet */}
      <mesh ref={duvetRef} geometry={duvetGeo} position={[0, 0.58, 0.15]} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.duvetColor} roughness={0.93} side={THREE.DoubleSide} />
      </mesh>

      {/* Pillows */}
      <mesh geometry={pillowGeo} position={[-0.35, 0.6, -0.55]} rotation={[0, 0.08, 0]} castShadow>
        <meshStandardMaterial color={PALETTE.pillowLight} roughness={0.95} />
      </mesh>
      <mesh geometry={pillowGeo} position={[0.3, 0.6, -0.58]} rotation={[0, -0.12, 0]} castShadow>
        <meshStandardMaterial color={PALETTE.pillowAccent} roughness={0.95} />
      </mesh>
      {/* Small accent pillow */}
      <mesh position={[0.05, 0.62, -0.3]} rotation={[0.15, 0.3, 0.05]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.22]} />
        <meshStandardMaterial color={PALETTE.peach} roughness={0.9} />
      </mesh>
    </group>
  );
}
