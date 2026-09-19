import { PALETTE } from '../materials';

export function Chair() {
  return (
    <group position={[2.2, 0, -0.8]} rotation={[0, -0.4, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.04, 0.42]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Seat cushion */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.4, 0.05, 0.38]} />
        <meshStandardMaterial color={PALETTE.linen} roughness={0.92} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.72, -0.18]} castShadow>
        <boxGeometry args={[0.42, 0.55, 0.04]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Backrest cushion */}
      <mesh position={[0, 0.72, -0.155]} castShadow>
        <boxGeometry args={[0.36, 0.42, 0.03]} />
        <meshStandardMaterial color={PALETTE.linen} roughness={0.92} />
      </mesh>
      {/* Backrest top cap */}
      <mesh position={[0, 1.01, -0.18]} castShadow>
        <boxGeometry args={[0.44, 0.04, 0.06]} />
        <meshStandardMaterial color={PALETTE.darkWood} roughness={0.65} />
      </mesh>

      {/* Front legs */}
      <mesh position={[-0.18, 0.21, 0.16]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.035]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, 0.21, 0.16]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.035]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      {/* Back legs — slightly angled */}
      <mesh position={[-0.18, 0.21, -0.16]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.035]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, 0.21, -0.16]} castShadow>
        <boxGeometry args={[0.035, 0.42, 0.035]} />
        <meshStandardMaterial color={PALETTE.warmWood} roughness={0.7} />
      </mesh>
    </group>
  );
}
