import * as THREE from 'three';

/**
 * Centralized material palette for the entire scene.
 * All colors and material properties defined once,
 * reused everywhere for visual coherence.
 */

// ─── COLOR PALETTE ───────────────────────────────────────────────
export const PALETTE = {
  cream:       '#F4EBDD',
  lightWood:   '#E7D4B5',
  warmWood:    '#B88A68',
  darkWood:    '#8B6B4A',
  sage:        '#A8B89A',
  peach:       '#DFA58C',
  terracotta:  '#C9795B',
  charcoal:    '#3A3431',
  darkCharcoal:'#2A2622',
  offWhite:    '#FAF7F2',
  linen:       '#E8E0D4',
  plantGreen:  '#6B7F5A',
  plantDark:   '#4A5E3C',
  rugColor:    '#C4B8A6',
  screenBlue:  '#4FC3F7',
  lampWarm:    '#FFCC66',
  pillowLight: '#EDE5D8',
  pillowAccent:'#D4C4B0',
  duvetColor:  '#DDD5C8',
  mugWhite:    '#F0EDE8',
  bookCover:   '#9B6B4A',
  bookCover2:  '#6B7B6A',
  frameGold:   '#C4A872',
} as const;

// ─── MATERIAL FACTORIES ─────────────────────────────────────────
// Each returns a new instance so React can manage disposal.

export function wallMaterial() {
  return new THREE.MeshStandardMaterial({
    color: PALETTE.cream,
    roughness: 0.92,
    metalness: 0,
  });
}

export function floorMaterial() {
  return new THREE.MeshStandardMaterial({
    color: PALETTE.lightWood,
    roughness: 0.85,
    metalness: 0,
  });
}

export function platformMaterial() {
  return new THREE.MeshStandardMaterial({
    color: PALETTE.warmWood,
    roughness: 0.75,
    metalness: 0.02,
  });
}

export function woodMaterial(color: string = PALETTE.warmWood) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.02,
  });
}

export function fabricMaterial(color: string = PALETTE.linen) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    metalness: 0,
  });
}

export function charcoalMaterial() {
  return new THREE.MeshStandardMaterial({
    color: PALETTE.charcoal,
    roughness: 0.6,
    metalness: 0.15,
  });
}

export function metalMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#1A1A1A',
    roughness: 0.3,
    metalness: 0.8,
  });
}

export function glassMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: '#D8E8F0',
    roughness: 0.05,
    metalness: 0,
    transmission: 0.85,
    thickness: 0.1,
    transparent: true,
    opacity: 0.3,
  });
}

export function plantMaterial(color: string = PALETTE.plantGreen) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.75,
    metalness: 0,
    side: THREE.DoubleSide,
  });
}

export function screenMaterial(emissiveColor: string = PALETTE.screenBlue) {
  return new THREE.MeshStandardMaterial({
    color: emissiveColor,
    emissive: emissiveColor,
    emissiveIntensity: 0.4,
    roughness: 0.1,
    metalness: 0.1,
  });
}
