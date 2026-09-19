import * as THREE from 'three';

const COLORS = {
  primary: '#F4EBDD', // warm cream
  lightWood: '#E7D4B5',
  warmWood: '#B88A68',
  mutedSage: '#A8B89A',
  softPeach: '#DFA58C',
  terracotta: '#C9795B',
  charcoal: '#3A3431',
  plantGreen: '#4A5D4E' // deep muted green
};

// Create reusable materials
export const materials = {
  creamWall: new THREE.MeshStandardMaterial({ 
    color: COLORS.primary, 
    roughness: 0.9, 
    metalness: 0.1 
  }),
  woodPlatform: new THREE.MeshStandardMaterial({ 
    color: COLORS.lightWood, 
    roughness: 0.85, 
    metalness: 0.05 
  }),
  woodDark: new THREE.MeshStandardMaterial({ 
    color: COLORS.warmWood, 
    roughness: 0.85, 
    metalness: 0.05 
  }),
  terracotta: new THREE.MeshStandardMaterial({ 
    color: COLORS.terracotta, 
    roughness: 0.9, 
    metalness: 0.0 
  }),
  softPeach: new THREE.MeshStandardMaterial({ 
    color: COLORS.softPeach, 
    roughness: 1.0, 
    metalness: 0.0 
  }),
  fabricBed: new THREE.MeshStandardMaterial({ 
    color: COLORS.primary, 
    roughness: 1.0, 
    metalness: 0.0,
    side: THREE.DoubleSide
  }),
  fabricDuvet: new THREE.MeshStandardMaterial({ 
    color: COLORS.softPeach, 
    roughness: 1.0, 
    metalness: 0.0,
    side: THREE.DoubleSide
  }),
  rug: new THREE.MeshStandardMaterial({
    color: COLORS.mutedSage,
    roughness: 1.0,
    metalness: 0.0
  }),
  metalCharcoal: new THREE.MeshStandardMaterial({
    color: COLORS.charcoal,
    roughness: 0.3,
    metalness: 0.7
  }),
  metalLight: new THREE.MeshStandardMaterial({
    color: '#E0E0E0',
    roughness: 0.3,
    metalness: 0.8
  }),
  laptopScreen: new THREE.MeshStandardMaterial({
    color: '#0A0A0A',
    roughness: 0.1,
    metalness: 0.9,
    emissive: '#ffffff',
    emissiveIntensity: 0 // Will animate
  }),
  plantLeaf: new THREE.MeshStandardMaterial({
    color: COLORS.plantGreen,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide
  }),
  plantPot: new THREE.MeshStandardMaterial({
    color: COLORS.terracotta,
    roughness: 0.8,
    metalness: 0.1
  }),
  lampBody: new THREE.MeshStandardMaterial({
    color: COLORS.charcoal,
    roughness: 0.5,
    metalness: 0.5
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.9, // glass effect
    thickness: 0.1,
    ior: 1.5,
    transparent: true,
    opacity: 1
  })
};
