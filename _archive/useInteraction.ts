import { useCallback, useEffect, useState } from 'react';
import { useAppStore, type ObjectType } from '../store';

export function useInteraction(id: ObjectType, onClickAction?: () => void) {
  const [hovered, setHovered] = useState(false);
  const { activeObject, setActiveObject, setHoveredObject } = useAppStore();

  const isGlobalActive = activeObject !== null;
  const isThisActive = activeObject === id;

  const handlePointerOver = useCallback((e: any) => {
    e.stopPropagation();
    if (!isGlobalActive) {
      setHovered(true);
      setHoveredObject(id);
      document.body.style.cursor = 'pointer';
    }
  }, [isGlobalActive, id, setHoveredObject]);

  const handlePointerOut = useCallback((e: any) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredObject(null);
    document.body.style.cursor = 'auto';
  }, [setHoveredObject]);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    if (isThisActive) {
      setActiveObject(null);
    } else {
      setActiveObject(id);
      if (onClickAction) onClickAction();
    }
    setHovered(false);
    setHoveredObject(null);
    document.body.style.cursor = 'auto';
  }, [isThisActive, id, setActiveObject, setHoveredObject, onClickAction]);

  // Cleanup cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return {
    hovered,
    isActive: isThisActive,
    isGlobalActive,
    handlers: {
      onPointerOver: handlePointerOver,
      onPointerOut: handlePointerOut,
      onClick: handleClick,
    }
  };
}
