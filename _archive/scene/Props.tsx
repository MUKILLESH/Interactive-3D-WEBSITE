import { PALETTE } from '../materials';

export function Rug() {
  return (
    <group position={[0, 0.02, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[3.5, 0.03, 2.8]} />
        <meshStandardMaterial color={PALETTE.rugColor} roughness={0.95} />
      </mesh>
      {/* Rug border accent */}
      <mesh position={[0, 0.001, 0]}>
        <boxGeometry args={[3.3, 0.031, 2.6]} />
        <meshStandardMaterial color={PALETTE.sage} roughness={0.95} opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

export function Props() {
  return (
    <group>
      {/* Books on desk */}
      <group position={[2.9, 0.77, -1.6]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.035, 0.2]} />
          <meshStandardMaterial color={PALETTE.bookCover} roughness={0.85} />
        </mesh>
        <mesh position={[0.02, 0.035, -0.01]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.18]} />
          <meshStandardMaterial color={PALETTE.bookCover2} roughness={0.85} />
        </mesh>
        <mesh position={[-0.01, 0.065, 0.005]} castShadow>
          <boxGeometry args={[0.13, 0.025, 0.19]} />
          <meshStandardMaterial color={PALETTE.terracotta} roughness={0.85} />
        </mesh>
      </group>

      {/* Mug on desk */}
      <mesh position={[1.5, 0.79, -1.55]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 12]} />
        <meshStandardMaterial color={PALETTE.mugWhite} roughness={0.6} />
      </mesh>
      {/* Mug handle */}
      <mesh position={[1.54, 0.79, -1.55]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.025, 0.006, 6, 12, Math.PI]} />
        <meshStandardMaterial color={PALETTE.mugWhite} roughness={0.6} />
      </mesh>

      {/* Picture frame on wall */}
      <group position={[-3.8, 2.5, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.45, 0.025]} />
          <meshStandardMaterial color={PALETTE.frameGold} roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Frame inner (artwork placeholder) */}
        <mesh position={[0, 0, 0.014]}>
          <boxGeometry args={[0.5, 0.35, 0.002]} />
          <meshStandardMaterial color={PALETTE.sage} roughness={0.9} />
        </mesh>
      </group>

      {/* Small picture frame on back wall */}
      <group position={[1.0, 2.2, -3.35]} rotation={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.28, 0.02]} />
          <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.28, 0.2, 0.002]} />
          <meshStandardMaterial color={PALETTE.peach} roughness={0.9} />
        </mesh>
      </group>

      {/* Bedside table */}
      <group position={[0.2, 0, 0.5]}>
        {/* Top */}
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.035, 0.35]} />
          <meshStandardMaterial color={PALETTE.warmWood} roughness={0.72} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.38, 0.32, 0.33]} />
          <meshStandardMaterial color={PALETTE.lightWood} roughness={0.78} />
        </mesh>
        {/* Drawer handle */}
        <mesh position={[0, 0.3, 0.17]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshStandardMaterial color={PALETTE.charcoal} roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Legs */}
        {[[-0.16, -0.14], [0.16, -0.14], [-0.16, 0.14], [0.16, 0.14]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.07, z]} castShadow>
            <boxGeometry args={[0.03, 0.14, 0.03]} />
            <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Small decorative object on bedside table (a tiny plant/candle) */}
      <mesh position={[0.25, 0.52, 0.5]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.06, 8]} />
        <meshStandardMaterial color={PALETTE.terracotta} roughness={0.85} />
      </mesh>
    </group>
  );
}
