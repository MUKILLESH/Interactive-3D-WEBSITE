import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAppStore } from '../store';

export function CameraController({ started }: { started: boolean }) {
  const { camera, scene } = useThree();
  const { activeObject } = useAppStore();

  const targetProxy = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!started) return;

    let targetPos = { x: 15, y: 15, z: 15 }; // Default Iso view
    let lookAtPos = { x: 0, y: 0, z: 0 }; // Default center

    switch (activeObject) {
      case 'BED':
        targetPos = { x: 2, y: 10, z: 6 };
        lookAtPos = { x: -0.8, y: 0.5, z: 0.5 };
        break;
      case 'LAPTOP':
        targetPos = { x: 7, y: 6, z: 7 };
        lookAtPos = { x: 3.5, y: 1.0, z: -1.5 }; // Focus on desk area
        break;
      case 'PLANT':
        targetPos = { x: -3, y: 6, z: 2 };
        lookAtPos = { x: -2.5, y: 0.5, z: -2.5 }; // Plant area
        break;
      case 'LAMP':
        targetPos = { x: 7, y: 6, z: 3 };
        lookAtPos = { x: 3.5, y: 1.0, z: -2.0 }; // Lamp focus
        break;
      default:
        targetPos = { x: 15, y: 15, z: 15 };
        lookAtPos = { x: 0, y: 0, z: 0 };
        break;
    }

    // We animate the camera position directly
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    // Animate the lookAt target proxy
    gsap.to(targetProxy.current, {
      x: lookAtPos.x,
      y: lookAtPos.y,
      z: lookAtPos.z,
      duration: 1.2,
      ease: 'power3.inOut',
    });
  }, [activeObject, started, camera]);

  useFrame(() => {
    if (started) {
      camera.lookAt(targetProxy.current);
    }
  });

  return null;
}
