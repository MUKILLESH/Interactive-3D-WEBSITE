import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolioStore } from '../state/usePortfolioStore';
import type { ObjectType } from '../state/usePortfolioStore';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface Props {
  id: ObjectType;
  children: React.ReactNode;
}

const InteractiveObject = ({ id, children }: Props) => {
  const { setActiveObject, setHoveredObject, activeObject, hoveredObject, toggleLamp, cycleTimeOfDay, setCurrentSection, isTransitioning } = usePortfolioStore();
  const groupRef = useRef<THREE.Group>(null);
  const scaleValue = useRef(1);

  const isHovered = hoveredObject === id;
  const isActive = activeObject === id;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = isHovered && !isActive && !isTransitioning ? 1.012 : 1;
    scaleValue.current = THREE.MathUtils.damp(scaleValue.current, targetScale, 9, delta);
    groupRef.current.scale.setScalar(scaleValue.current);
  });

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    if (isTransitioning || isActive) return;
    document.body.style.cursor = 'pointer';
    setHoveredObject(id);
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    if (hoveredObject === id) {
      document.body.style.cursor = 'auto';
      setHoveredObject('NONE');
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (isTransitioning) return;

    if (activeObject === id) {
      if (id === 'LAMP') toggleLamp();
      if (id === 'WINDOW') cycleTimeOfDay();
    } else {
      if (id === 'LAMP') toggleLamp();
      if (id === 'WINDOW') cycleTimeOfDay();
      setActiveObject(id);

      if (id === 'BED') setCurrentSection('ABOUT');
      if (id === 'LAPTOP') setCurrentSection('PROJECTS');
      if (id === 'PLANT') setCurrentSection('ABOUT');
      if (id === 'LAMP') setCurrentSection('SKILLS');
      if (id === 'DESK') setCurrentSection('EXPERIENCE');
      if (id === 'BOOKSHELF') setCurrentSection('SKILLS');
      if (id === 'HEADPHONES') setCurrentSection('INTERESTS');
      if (id === 'WINDOW') setCurrentSection('CONTACT');
    }
  };

  const label = useMemo(() => {
    switch (id) {
      case 'BED': return ['ABOUT', 'A little about me'];
      case 'LAPTOP': return ['PROJECTS', 'Explore my work'];
      case 'LAMP': return ['SKILLS', 'What I build with'];
      case 'DESK': return ['EXPERIENCE', 'Where I build'];
      case 'PLANT': return ['ABOUT', 'A little about me'];
      case 'WINDOW': return ['CONTACT', "Let's connect"];
      case 'BOOKSHELF': return ['SKILLS', 'What I build with'];
      case 'HEADPHONES': return ['INTERESTS', 'What I love'];
      default: return [id, ''];
    }
  }, [id]);

  return (
    <group
      ref={groupRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {children}

      {isHovered && !isActive && !isTransitioning && (
        <Html position={[0, 1, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="hotspot-label">
            <div className="hotspot-kicker">{label[0]}</div>
            {label[1] && <div className="hotspot-sub">{label[1]}</div>}
          </div>
        </Html>
      )}
    </group>
  );
};

export default InteractiveObject;
