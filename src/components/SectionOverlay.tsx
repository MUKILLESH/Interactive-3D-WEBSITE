import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../state/usePortfolioStore';
import { portfolioData } from '../content/portfolio';
import gsap from 'gsap';

const SectionOverlay = () => {
  const { currentSection, activeObject, setActiveObject } = usePortfolioStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isVisible = activeObject !== 'NONE' && activeObject !== 'WINDOW';

  useEffect(() => {
    if (isVisible) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.7, ease: 'expo.out' });
      gsap.fromTo(contentRef.current, 
        { x: -36, opacity: 0, filter: 'blur(8px)' }, 
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.05, delay: 0.12, ease: 'expo.out' }
      );
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' });
    }
  }, [isVisible, currentSection]);

  if (!isVisible && !overlayRef.current) return null;

  return (
    <div 
      ref={overlayRef} 
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: isVisible ? 'auto' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
        padding: '3rem', paddingLeft: '4rem', zIndex: 10, visibility: 'hidden',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <div 
        ref={contentRef} 
        style={{
          background: 'rgba(244, 235, 221, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '2.5rem',
          paddingTop: '2rem',
          borderRadius: '4px',
          width: '380px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          color: '#2a2a2a'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>
            {currentSection}
          </h2>
          <button 
            onClick={() => setActiveObject('NONE')} 
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
              color: '#888', padding: '0.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1a1a1a'}
            onMouseOut={(e) => e.currentTarget.style.color = '#888'}
          >
            EXIT
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          {currentSection === 'ABOUT' && (
            <div>
              <p style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '1rem' }}>{portfolioData.about.introduction}</p>
              <p style={{ color: '#555' }}>{portfolioData.about.background}</p>
              <p style={{ color: '#555' }}>{portfolioData.about.approach}</p>
            </div>
          )}

          {currentSection === 'PROJECTS' && (
            <div>
              {portfolioData.projects.filter(p => p.id !== 'project-2').slice(0, 3).map(proj => ( // Limit to top 3 for UI clarity
                <div key={proj.id} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{proj.title}</h3>
                  <p style={{ color: '#555', margin: '0 0 1rem 0', fontSize: '0.85rem' }}>{proj.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {proj.technologies.map(tech => (
                      <span key={tech} style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', fontWeight: 500 }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
              <button style={{ background: 'none', border: '1px solid #ddd', padding: '0.5rem 1rem', fontSize: '0.75rem', cursor: 'pointer', width: '100%' }}>
                VIEW ALL PROJECTS
              </button>
            </div>
          )}

          {currentSection === 'SKILLS' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', margin: '0 0 1rem 0', textTransform: 'uppercase', color: '#666' }}>Spatial & 3D</h3>
                <p style={{ fontWeight: 500 }}>{portfolioData.skills.spatial.join(', ')}</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', margin: '0 0 1rem 0', textTransform: 'uppercase', color: '#666' }}>Frontend</h3>
                <p style={{ fontWeight: 500 }}>{portfolioData.skills.frontend.join(', ')}</p>
              </div>
            </div>
          )}
          
          {currentSection === 'EXPERIENCE' && (
            <div>
               <p style={{ color: '#555' }}>Experience section content to be added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionOverlay;
