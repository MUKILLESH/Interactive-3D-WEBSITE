import { RoundedBox } from '@react-three/drei';
import { useAppStore, type TimeOfDay } from '../store';
import { useInteraction } from '../hooks/useInteraction';
import { useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const MATTE_MATERIAL = {
  roughness: 0.9,
  metalness: 0.05,
};

const WOOD_MATERIAL = {
  roughness: 0.6,
  metalness: 0.1,
  clearcoat: 0.2,
  clearcoatRoughness: 0.4,
};

export function Platform(props: any) {
  const wallColor = '#FCFAF0'; // Cozy cream
  const platformColor = '#E7D4B5'; // Premium light blonde wood

  return (
    <group {...props}>
      {/* Base Platform */}
      <RoundedBox args={[10.6, 0.4, 9.6]} position={[0, -0.2, 0]} radius={0.05} smoothness={4} receiveShadow castShadow>
        <meshStandardMaterial color={platformColor} roughness={0.8} />
      </RoundedBox>

      {/* Main Floor Planks (Simulated with slight color variation) */}
      <RoundedBox args={[10.6, 0.05, 9.6]} radius={0.02} smoothness={4} position={[0, 0.025, 0]} receiveShadow>
        <meshPhysicalMaterial color="#dfbe9f" {...WOOD_MATERIAL} />
      </RoundedBox>

      {/* Entry Step / Extension */}
      <RoundedBox args={[4.4, 0.3, 2]} radius={0.1} smoothness={4} position={[0, -0.15, 5.8]} receiveShadow castShadow>
        <meshPhysicalMaterial color={platformColor} {...WOOD_MATERIAL} roughness={0.7} />
      </RoundedBox>

      {/* Rug will be loaded as a GLB in Furniture.tsx */}
      {/* Left Wall (Shortened) */}
      <RoundedBox args={[0.5, 4.5, 9.6]} radius={0.08} smoothness={4} position={[-5.05, 2.25, 0]} receiveShadow castShadow>
        <meshStandardMaterial color={wallColor} {...MATTE_MATERIAL} />
      </RoundedBox>

      {/* Back Wall with perfectly aligned Cutout for Window */}
      <group position={[0, 0, -4.55]}>
        {/* Bottom Wall under window */}
        <RoundedBox args={[9.6, 1.2, 0.5]} radius={0.08} smoothness={4} position={[0, 0.6, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={wallColor} {...MATTE_MATERIAL} />
        </RoundedBox>
        {/* Top Wall above window */}
        <RoundedBox args={[9.6, 1.5, 0.5]} radius={0.08} smoothness={4} position={[0, 3.75, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={wallColor} {...MATTE_MATERIAL} />
        </RoundedBox>
        {/* Left of window */}
        <RoundedBox args={[2.8, 1.8, 0.5]} radius={0.08} smoothness={4} position={[-3.4, 2.1, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={wallColor} {...MATTE_MATERIAL} />
        </RoundedBox>
        {/* Right of window */}
        <RoundedBox args={[2.8, 1.8, 0.5]} radius={0.08} smoothness={4} position={[3.4, 2.1, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={wallColor} {...MATTE_MATERIAL} />
        </RoundedBox>

        {/* Procedural Window Frame & Curtains framing the light */}
        <InteractiveWindow />
      </group>
    </group>
  );
}

function InteractiveWindow() {
  const { setTimeOfDay, timeOfDay } = useAppStore();
  
  const cycleTime = () => {
    const order: TimeOfDay[] = ['MORNING', 'AFTERNOON', 'SUNSET', 'NIGHT'];
    const nextIdx = (order.indexOf(timeOfDay) + 1) % order.length;
    setTimeOfDay(order[nextIdx]);
  };

  const { hovered, isGlobalActive, handlers } = useInteraction('WINDOW', cycleTime);
  const glassRef = useRef<THREE.Mesh>(null);

  if (hovered && !isGlobalActive) {
    if (glassRef.current) gsap.to((glassRef.current.material as THREE.MeshBasicMaterial).color, { r: 1.0, g: 1.0, b: 1.0, duration: 0.3 });
  } else {
    if (glassRef.current) gsap.to((glassRef.current.material as THREE.MeshBasicMaterial).color, { r: 0.83, g: 0.91, b: 0.97, duration: 0.3 });
  }

  return (
    <group position={[0, 2.1, 0]} {...handlers}>
      {/* Glass Pane */}
      <mesh ref={glassRef} position={[0, 0, -0.1]}>
        <planeGeometry args={[4.0, 1.8]} />
        <meshBasicMaterial color="#d4e8f9" transparent opacity={0.6} />
      </mesh>
      
      {/* Curtain Rod */}
      <mesh position={[0, 1.0, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 4.4]} />
        <meshPhysicalMaterial color="#3A3431" roughness={0.6} metalness={0.4} />
      </mesh>
      
      {/* Left Curtain */}
      <mesh position={[-1.6, -0.1, 0.2]} castShadow>
        <boxGeometry args={[0.8, 2.1, 0.15]} />
        <meshStandardMaterial color="#FCFAF0" roughness={0.9} />
      </mesh>
      
      {/* Right Curtain */}
      <mesh position={[1.6, -0.1, 0.2]} castShadow>
        <boxGeometry args={[0.8, 2.1, 0.15]} />
        <meshStandardMaterial color="#FCFAF0" roughness={0.9} />
      </mesh>
    </group>
  );
}
