import { SoftShadows, Environment } from '@react-three/drei';
import { Platform } from './Room';
import { Bed, Desk, Window, Rug, Clutter } from './Furniture';
import { useInteraction } from '../hooks/useInteraction';
import { useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useAppStore } from '../store';
import { Lighting } from './Lighting';
import { CameraController } from './CameraController';
import { useControls } from 'leva';

export function Scene({ started }: { started: boolean }) {
  return (
    <>
      <color attach="background" args={['#201c18']} />
      
      {/* Cinematic Shadows */}
      
      {/* Lighting System */}
      <Lighting />
      
      {/* Ambient reflections */}
      <Environment preset="city" environmentIntensity={0.15} />

      {/* Camera Management */}
      <CameraController started={started} />
      
      {/* Room Group */}
      <group position={[0, -1.2, 0]}>
        <Platform />
        
        {/* Window GLB removed; replaced by procedural architectural window in Room.tsx */}
        
        {/* Center Mass - Asymmetrical, pulled away from walls */}
        <group position={[-0.8, 0.05, 0.5]} scale={3.5}>
          <Bed position={[0, 0, 0]} />
        </group>
        
        <group position={[-0.2, 0.05, 0.8]} scale={3.5}>
          <Rug position={[0, 0, 0]} />
        </group>
        
        {/* Desk */}
        <group position={[2.5, 0.05, -1.8]} scale={3.5}>
          <Desk position={[0, 0, 0]} />
        </group>

        {/* Procedurally aligned clutter - moved to root room group to avoid compound scaling issues */}
        <ClutterGroup />

        <InteractivePlant />
        
        {/* Clutter was exported at world origin and is floating, hiding to prevent visual noise */}
        {/*
        <group position={[-0.2, -3.5, -2.5]} scale={3.5}>
          <Clutter position={[0, 0, 0]} />
        </group>
        */}
        
        {/* Placeholders removed as per instructions */}
      </group>
    </>
  );
}

function ClutterGroup() {
  const { cx, cy, cz } = useControls('Clutter', {
    cx: { value: 4.5, min: -5, max: 6, step: 0.1 },
    cy: { value: 2.71, min: 0, max: 5, step: 0.01 },
    cz: { value: 2.0, min: -5, max: 5, step: 0.1 }
  });

  return (
    <group position={[cx, cy, cz]} scale={3.5}>
      <InteractiveLaptop />
      
      {/* Book */}
      <mesh position={[0.25, 0.0, 0.1]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.03, 0.2]} />
        <meshPhysicalMaterial color="#C9795B" roughness={0.8} />
      </mesh>
      
      {/* Mug */}
      <mesh position={[0.35, 0.02, -0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
        <meshPhysicalMaterial color="#FCFAF0" roughness={0.3} clearcoat={0.5} />
      </mesh>
      
      <InteractiveLamp />
    </group>
  );
}

// Procedural Interactive Sub-Components

function InteractiveLaptop() {
  const { hovered, isActive, isGlobalActive, handlers } = useInteraction('LAPTOP');
  const screenRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  if (hovered && !isGlobalActive) {
    if (screenRef.current) gsap.to((screenRef.current.material as THREE.MeshBasicMaterial).color, { r: 1.0, g: 1.0, b: 1.0, duration: 0.3 });
    if (groupRef.current) gsap.to(groupRef.current.rotation, { z: 0.05, duration: 0.3 });
  } else {
    if (screenRef.current) gsap.to((screenRef.current.material as THREE.MeshBasicMaterial).color, { r: 0.3, g: 0.76, b: 0.96, duration: 0.3 });
    if (groupRef.current) gsap.to(groupRef.current.rotation, { z: 0, duration: 0.3 });
  }

  return (
    <group ref={groupRef} {...handlers} position={[-0.1, 0, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshPhysicalMaterial color="#3A3431" roughness={0.5} />
      </mesh>
      {/* Laptop Screen Back */}
      <mesh position={[-0.02, 0.1, -0.09]} rotation={[0.2, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshBasicMaterial color="#3A3431" />
      </mesh>
      {/* Laptop Screen Glow */}
      <mesh ref={screenRef} position={[-0.02, 0.1, -0.08]} rotation={[0.2, 0.3, 0]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshBasicMaterial color="#4fc3f7" />
      </mesh>
    </group>
  );
}

function InteractiveLamp() {
  const { toggleLamp } = useAppStore();
  const { hovered, isActive, isGlobalActive, handlers } = useInteraction('LAMP', toggleLamp);
  const groupRef = useRef<THREE.Group>(null);

  if (hovered && !isGlobalActive && groupRef.current) {
    gsap.to(groupRef.current.rotation, { z: -0.1, duration: 0.3 });
  } else if (groupRef.current) {
    gsap.to(groupRef.current.rotation, { z: 0, duration: 0.3 });
  }

  return (
    <group ref={groupRef} position={[-0.3, 0.0, -0.2]} {...handlers}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.02, 16]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0.05, 0.3, 0]} rotation={[0, 0, -0.5]} castShadow>
        <coneGeometry args={[0.1, 0.15, 16]} />
        <meshPhysicalMaterial color="#3A3431" roughness={0.4} />
      </mesh>
    </group>
  );
}

function InteractivePlant() {
  const { hovered, isActive, isGlobalActive, handlers } = useInteraction('PLANT');
  const groupRef = useRef<THREE.Group>(null);

  if (hovered && !isGlobalActive && groupRef.current) {
    gsap.to(groupRef.current.rotation, { y: 0.2, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  } else if (groupRef.current) {
    gsap.killTweensOf(groupRef.current.rotation);
    gsap.to(groupRef.current.rotation, { y: 0, duration: 0.5 });
  }

  const { px, py, pz } = useControls('Plant', {
    px: { value: -3.8, min: -5, max: 5, step: 0.1 },
    py: { value: 0.0, min: -1, max: 5, step: 0.1 },
    pz: { value: 3.8, min: -5, max: 5, step: 0.1 }
  });

  return (
    <group ref={groupRef} position={[px, py, pz]} scale={3.5} {...handlers}>
      {/* Pot */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.1, 0.2, 16]} />
        <meshPhysicalMaterial color="#e0ded8" roughness={0.9} />
      </mesh>
      {/* Leaves (Simple primitive abstraction) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshPhysicalMaterial color="#7a8a70" roughness={0.6} />
      </mesh>
      <mesh position={[0.1, 0.3, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshPhysicalMaterial color="#6b7a62" roughness={0.6} />
      </mesh>
    </group>
  );
}
