import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../state/usePortfolioStore';
import gsap from 'gsap';

const LoadingScreen = () => {
  const { isLoading } = usePortfolioStore();
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && screenRef.current) {
      gsap.to(screenRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 1.25,
        ease: "expo.inOut",
        onComplete: () => {
          if (screenRef.current) screenRef.current.style.display = 'none';
        }
      });
    }
  }, [isLoading]);

  return (
    <div 
      ref={screenRef}
      style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: '#F4EBDD',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center'
      }}
    >
      <h1 style={{ fontWeight: 500, fontSize: '1.2rem', letterSpacing: '0.2em', color: '#1a1a1a', fontFamily: '"Inter", sans-serif', margin: 0 }}>MUKILLESH</h1>
      <div style={{ marginTop: '2rem', width: '200px', height: '1px', background: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ 
          width: '50%', height: '100%', background: '#3A3431',
          animation: 'loadAnim 1.5s infinite ease-in-out'
        }} />
      </div>
      <style>
        {`
          @keyframes loadAnim {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
