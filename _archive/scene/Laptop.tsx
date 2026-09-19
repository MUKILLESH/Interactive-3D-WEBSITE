import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../materials';
import { useInteraction } from '../interaction/useInteraction';

export function Laptop() {
  const { hovered, isActive, handlers } = useInteraction('LAPTOP');
  const screenRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || !lidRef.current || !screenRef.current) return;

    // Hover: screen brightens, subtle tilt
    const targetEmissive = hovered ? 0.8 : 0.35;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.08;

    // Subtle hover tilt
    const targetTilt = hovered && !isActive ? 0.02 : 0;
    groupRef.current.rotation.z += (targetTilt - groupRef.current.rotation.z) * 0.06;

    // Lid angle
    const targetLid = isActive ? -1.2 : -1.5; // wider open when active
    lidRef.current.rotation.x += (targetLid - lidRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef} position={[2.0, 0.755, -1.8]} rotation={[0, 0.2, 0]} {...handlers}>
      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.018, 0.26]} />
        <meshStandardMaterial color={PALETTE.charcoal} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Keyboard area impression */}
      <mesh position={[0, 0.01, 0.02]}>
        <boxGeometry args={[0.32, 0.002, 0.16]} />
        <meshStandardMaterial color={PALETTE.darkCharcoal} roughness={0.7} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.01, 0.1]}>
        <boxGeometry args={[0.1, 0.001, 0.06]} />
        <meshStandardMaterial color={'#454040'} roughness={0.4} />
      </mesh>

      {/* Lid (hinged group) */}
      <group ref={lidRef} position={[0, 0.01, -0.13]} rotation={[-1.5, 0, 0]}>
        {/* Screen back / lid */}
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.25, 0.012]} />
          <meshStandardMaterial color={PALETTE.charcoal} roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Screen surface */}
        <mesh ref={screenRef} position={[0, 0, 0.007]}>
          <boxGeometry args={[0.34, 0.21, 0.002]} />
          <meshStandardMaterial
            color={PALETTE.screenBlue}
            emissive={PALETTE.screenBlue}
            emissiveIntensity={0.35}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}
