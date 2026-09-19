import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  children: React.ReactNode;
  amount?: number;
  speed?: number;
}

export function AmbientMotion({ children, amount = 0.012, speed = 0.42 }: Props) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + seed;
    ref.current.rotation.z = Math.sin(t) * amount;
    ref.current.rotation.x = Math.cos(t * 0.73) * amount * 0.35;
  });

  return <group ref={ref}>{children}</group>;
}
