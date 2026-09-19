import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store';
import gsap from 'gsap';
import { X } from 'lucide-react';

export function Overlay() {
  const activeObject = useAppStore(state => state.activeObject);
  const setActiveObject = useAppStore(state => state.setActiveObject);
  
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeObject) {
      gsap.to(panelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', pointerEvents: 'auto' });
    } else {
      gsap.to(panelRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power3.in', pointerEvents: 'none' });
    }
  }, [activeObject]);

  const renderContent = () => {
    switch (activeObject) {
      case 'LAPTOP':
        return (
          <>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#e0e0e0' }}>Projects</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.5, color: '#a0a0a0', marginBottom: '2rem' }}>Here are some of the things I've built. Interaction is key.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 6, color: '#e0e0e0', fontWeight: 400 }}>Project Alpha</h3>
                <p style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>A WebGL experiment in motion.</p>
              </div>
              <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 6, color: '#e0e0e0', fontWeight: 400 }}>Project Beta</h3>
                <p style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Interactive storytelling platform.</p>
              </div>
            </div>
          </>
        );
      case 'PLANT':
        return (
          <>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#e0e0e0' }}>About Me</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#a0a0a0' }}>
              I'm a creative developer who loves blending design and code to create immersive, 
              interactive experiences that feel alive.
            </p>
          </>
        );
      case 'WINDOW':
        return (
          <>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#e0e0e0' }}>The World</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#a0a0a0' }}>
              Time changes perspectives. Click the window to change the time of day and see the room in a new light.
            </p>
          </>
        );
      case 'BED':
        return (
          <>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#e0e0e0' }}>Rest</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#a0a0a0' }}>
              Sometimes the best ideas come when you're doing nothing at all. Take a breath.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overlay" style={{ pointerEvents: 'none' }}>
      {/* HUD Header */}
      <div style={{ position: 'absolute', top: 40, left: 40, pointerEvents: 'auto' }}>
        <h1 style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0, letterSpacing: '0.15em', color: '#1a1a1a' }}>MUKILLESH</h1>
      </div>

      <div style={{ position: 'absolute', top: 40, right: 40, display: 'flex', gap: '2rem', pointerEvents: 'auto', opacity: activeObject ? 0 : 1, transition: 'opacity 0.5s' }}>
         {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(item => (
            <div key={item} style={{ fontSize: '0.9rem', color: '#1a1a1a', opacity: 0.6, cursor: 'pointer', letterSpacing: '0.05em' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}>
                {item}
            </div>
         ))}
      </div>

      {/* Content Overlay */}
      <div 
        ref={panelRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          width: '380px',
          maxWidth: '90vw',
          opacity: 0,
          pointerEvents: 'none',
          background: 'rgba(20, 20, 20, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        }}
      >
        <button 
          onClick={() => setActiveObject(null)}
          style={{ position: 'absolute', top: 20, right: 20, padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
        >
          <X size={20} color="#fff" />
        </button>
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
