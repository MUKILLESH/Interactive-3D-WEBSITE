import { useGLTF } from '@react-three/drei';
import { useInteraction } from '../hooks/useInteraction';
import { useAppStore } from '../store';
import * as THREE from 'three';
import React, { useMemo } from 'react';
import gsap from 'gsap';

// Art Direction Palette
export const PALETTE = {
  cream: '#F4EBDD',
  blondeWood: '#E7D4B5',
  warmWood: '#B88A68',
  sage: '#A8B89A',
  peach: '#DFA58C',
  terracotta: '#C9795B',
  charcoal: '#3A3431',
  ivory: '#FCFAF0'
};

function useSanitizedGLTF(url: string, colorMap: Record<string, string> = {}, receiveShadow = true, castShadow = true) {
  const gltf = useGLTF(url);
  
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone();
    cloned.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
        
        let targetColor = undefined;
        let matchedKey = '';
        for (const [key, color] of Object.entries(colorMap)) {
           if (child.name && child.name.toLowerCase().includes(key.toLowerCase())) {
             targetColor = color;
             matchedKey = key;
             break;
           }
        }

        if (child.material) {
          child.material = child.material.clone();
          if (targetColor) {
             // If it's wood (desk, bed frame), use physical material
             if (matchedKey === 'escritorio' || matchedKey === 'base' || matchedKey === 'ventana' || matchedKey === 'cama') {
                const mat = new THREE.MeshPhysicalMaterial({
                   color: new THREE.Color(targetColor),
                   roughness: 0.2,
                   metalness: 0.05,
                   clearcoat: 0.5,
                   clearcoatRoughness: 0.2
                });
                child.material = mat;
             } else if (matchedKey === 'sabana' || matchedKey === 'colchon' || matchedKey === 'almohada') {
                // Fabric needs high roughness, no flat shading
                const mat = new THREE.MeshStandardMaterial({
                   color: new THREE.Color(targetColor),
                   roughness: 0.9,
                   metalness: 0.0,
                   flatShading: false
                });
                child.material = mat;
             } else {
                child.material.color = new THREE.Color(targetColor);
                child.material.roughness = 0.7;
                child.material.metalness = 0.05;
             }
          }
        }
      }
    });
    return cloned;
  }, [gltf]); // Removed colorMap from deps to avoid re-renders if passed inline, assuming static. Or we can just use JSON.stringify(colorMap).

  return scene;
}

export function Bed({ position }: { position: [number, number, number] }) {
  const bedScene = useSanitizedGLTF('/models/hero/bed.glb', { 'cama': PALETTE.blondeWood, 'colchon': PALETTE.cream });
  const beddingScene = useSanitizedGLTF('/models/hero/bedding.glb', { 'sabana': PALETTE.sage });
  const pillowScene = useSanitizedGLTF('/models/hero/pillow.glb', { 'almohada': PALETTE.ivory });

  const { hovered, isGlobalActive, handlers } = useInteraction('BED');
  const beddingRef = React.useRef<THREE.Group>(null);
  
  React.useEffect(() => {
    if (beddingRef.current) {
      if (hovered && !isGlobalActive) {
        gsap.to(beddingRef.current.scale, { y: 0.95, x: 1.02, z: 1.02, duration: 0.4, ease: 'power2.out' });
        gsap.to(beddingRef.current.position, { y: -0.05, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(beddingRef.current.scale, { y: 1, x: 1, z: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(beddingRef.current.position, { y: 0, duration: 0.4, ease: 'power2.out' });
      }
    }
  }, [hovered, isGlobalActive]);

  return (
    <group position={position} {...handlers}>
      <primitive object={bedScene} />
      <group ref={beddingRef}>
        <primitive object={beddingScene} />
        <primitive object={pillowScene} position={[0, 0.8, -1.0]} />
      </group>
    </group>
  );
}

export function Desk({ position }: { position: [number, number, number] }) {
  const deskScene = useSanitizedGLTF('/models/hero/desk.glb', { 'escritorio': PALETTE.warmWood });
  return (
    <group position={position}>
      <primitive object={deskScene} />
    </group>
  );
}

// Window component is now empty since the procedural window is in Room.tsx.
// We will export a dummy group here so Scene.tsx doesn't crash, but we should remove it from Scene.tsx later.
export function Window({ position }: { position: [number, number, number] }) {
  return <group position={position} />;
}

export function Rug({ position }: { position: [number, number, number] }) {
  const rugScene = useSanitizedGLTF('/models/hero/rug.glb', { 'alfombra': PALETTE.peach }, true, false);
  return (
    <group position={position}>
      <primitive object={rugScene} />
    </group>
  );
}

export function Clutter({ position }: { position: [number, number, number] }) {
  const clutterScene = useSanitizedGLTF('/models/props/clutter.glb', {
    'libro.030': PALETTE.peach, // The single book we want
    'taza': PALETTE.ivory,      // The mug
  });
  
  // Hide all other objects
  clutterScene.traverse((child: any) => {
    if (child.isMesh) {
       // Keep only specific items
       if (!child.name.includes('libro.030') && !child.name.includes('taza') && !child.name.toLowerCase().includes('laptop') && !child.name.toLowerCase().includes('screen') && !child.name.toLowerCase().includes('pantalla')) {
         child.visible = false;
       }
    }
  });

  return (
    <group position={position}>
      <primitive object={clutterScene} />
    </group>
  );
}

// Preload
useGLTF.preload('/models/hero/bed.glb');
useGLTF.preload('/models/hero/bedding.glb');
useGLTF.preload('/models/hero/pillow.glb');
useGLTF.preload('/models/hero/desk.glb');
useGLTF.preload('/models/hero/window.glb');
useGLTF.preload('/models/hero/rug.glb');
useGLTF.preload('/models/props/clutter.glb');
