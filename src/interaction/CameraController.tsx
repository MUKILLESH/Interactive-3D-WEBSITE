import { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { usePortfolioStore } from '../state/usePortfolioStore';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CAMERA_POSITIONS: Record<string, { pos: number[]; lookAt: number[]; zoom: number }> = {
  NONE: { pos: [7, 6, 7], lookAt: [-2.0, -0.5, 1.0], zoom: 125 },
  BED: { pos: [5, 5, 3], lookAt: [-1.0, -1.0, 1.8], zoom: 220 },
  LAPTOP: { pos: [1, 5, 5], lookAt: [-2.6, 0.0, -0.3], zoom: 280 },
  PLANT: { pos: [4, 4, 6], lookAt: [0, -0.5, -2.3], zoom: 240 },
  LAMP: { pos: [3, 5, 4], lookAt: [-2, 0.0, 0.8], zoom: 260 },
  DESK: { pos: [3, 5, 4], lookAt: [-1.4, -1.5, -0.4], zoom: 240 },
  WINDOW: { pos: [6, 5, 0], lookAt: [1.2, 1.3, -2.9], zoom: 220 },
  BOOKSHELF: { pos: [1, 5, 0], lookAt: [-2.0, -0.5, -2.2], zoom: 300 },
  HEADPHONES: { pos: [2, 4, 1], lookAt: [-2.0, -0.7, -1.3], zoom: 350 },
};

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CameraController = () => {
  const { activeObject, setIsTransitioning } = usePortfolioStore();
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(-2.0, -0.5, 1.0));
  const basePosition = useRef(new THREE.Vector3(7, 6, 7));
  const zoomProxy = useRef({ value: 125 });
  const targetOffset = useRef(new THREE.Vector2(0, 0));
  const currentOffset = useRef(new THREE.Vector2(0, 0));
  const composedLookAt = useMemo(() => new THREE.Vector3(), []);
  const reducedMotion = useMemo(() => reduceMotion(), []);

  useEffect(() => {
    camera.position.copy(basePosition.current);
    camera.lookAt(lookAtTarget.current);
  }, [camera]);

  useGSAP(() => {
    const target = CAMERA_POSITIONS[activeObject] || CAMERA_POSITIONS.NONE;
    const isMobile = window.innerWidth < 768;
    const duration = reducedMotion ? 0.2 : 1.85;
    const zoomModifier = isMobile ? 0.75 : 1.0;
    const yLookModifier = isMobile && activeObject !== 'NONE' ? -1.0 : 0;
    const orthoCam = camera as THREE.OrthographicCamera;

    setIsTransitioning(true);
    gsap.killTweensOf([basePosition.current, lookAtTarget.current, zoomProxy.current]);

    const timeline = gsap.timeline({
      defaults: { duration, ease: 'expo.inOut' },
      onComplete: () => setIsTransitioning(false),
    });

    timeline.to(basePosition.current, {
      x: target.pos[0],
      y: target.pos[1],
      z: target.pos[2],
    }, 0);

    zoomProxy.current.value = orthoCam.zoom;
    timeline.to(zoomProxy.current, {
      value: target.zoom * zoomModifier,
      onUpdate: () => {
        orthoCam.zoom = zoomProxy.current.value;
        orthoCam.updateProjectionMatrix();
      },
    }, 0);

    timeline.to(lookAtTarget.current, {
      x: target.lookAt[0],
      y: target.lookAt[1] + yLookModifier,
      z: target.lookAt[2],
    }, 0);
  }, [activeObject, camera, reducedMotion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeObject === 'NONE') {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        targetOffset.current.set(x * 0.22, y * 0.16);
      } else {
        targetOffset.current.set(0, 0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeObject]);

  useFrame(({ clock }, delta) => {
    currentOffset.current.x = THREE.MathUtils.damp(currentOffset.current.x, targetOffset.current.x, 3.4, delta);
    currentOffset.current.y = THREE.MathUtils.damp(currentOffset.current.y, targetOffset.current.y, 3.4, delta);

    const idle = reducedMotion || activeObject !== 'NONE' ? 0 : Math.sin(clock.elapsedTime * 0.32) * 0.045;
    const idleX = reducedMotion || activeObject !== 'NONE' ? 0 : Math.cos(clock.elapsedTime * 0.21) * 0.03;

    camera.position.set(
      basePosition.current.x + currentOffset.current.x * 0.35 + idleX,
      basePosition.current.y + idle,
      basePosition.current.z - currentOffset.current.y * 0.2,
    );

    composedLookAt.set(
      lookAtTarget.current.x - currentOffset.current.x * 0.55,
      lookAtTarget.current.y - currentOffset.current.y * 0.4 + idle * 0.25,
      lookAtTarget.current.z,
    );
    camera.lookAt(composedLookAt);
  });

  return null;
};
