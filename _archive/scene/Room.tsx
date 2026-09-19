import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from '../materials';

/** Raised wooden platform — the "stage" for the miniature world */
export function Platform() {
  return (
    <group>
      {/* Main platform body */}
      <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[8, 0.3, 7]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.72} />
      </mesh>
      {/* Bevel edge — slightly larger, slightly lower */}
      <mesh position={[0, -0.32, 0]} receiveShadow>
        <boxGeometry args={[8.15, 0.05, 7.15]} />
        <meshStandardMaterial color={PALETTE.darkWood} roughness={0.75} />
      </mesh>
      {/* Floor surface */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[7.9, 0.02, 6.9]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.85} />
      </mesh>
    </group>
  );
}

/** Two walls forming a room corner */
export function Walls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 2.0, -3.45]} receiveShadow castShadow>
        <boxGeometry args={[8, 4.2, 0.15]} />
        <meshStandardMaterial color={PALETTE.cream} roughness={0.92} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-3.95, 2.0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 4.2, 7]} />
        <meshStandardMaterial color={PALETTE.cream} roughness={0.92} />
      </mesh>
      {/* Baseboard — back */}
      <mesh position={[0, 0.08, -3.35]}>
        <boxGeometry args={[7.9, 0.16, 0.06]} />
        <meshStandardMaterial color={PALETTE.linen} roughness={0.8} />
      </mesh>
      {/* Baseboard — left */}
      <mesh position={[-3.85, 0.08, 0]}>
        <boxGeometry args={[0.06, 0.16, 6.9]} />
        <meshStandardMaterial color={PALETTE.linen} roughness={0.8} />
      </mesh>
    </group>
  );
}
