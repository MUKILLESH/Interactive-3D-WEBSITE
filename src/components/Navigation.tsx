import { usePortfolioStore } from '../state/usePortfolioStore';

const Navigation = () => {
  const { setActiveObject, setCurrentSection } = usePortfolioStore();

  return (
    <nav style={{
      position: 'absolute', top: '3rem', left: '3rem', zIndex: 20, pointerEvents: 'auto',
      fontFamily: '"Inter", sans-serif'
    }}>
      <h1 
        onClick={() => { setActiveObject('NONE'); setCurrentSection('HOME'); }}
        style={{ 
          margin: 0, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em', 
          cursor: 'pointer', color: '#111', textTransform: 'uppercase' 
        }}
      >
        Mukillesh
      </h1>
      <p style={{ margin: '0.3rem 0 0.8rem 0', fontSize: '0.75rem', color: '#444', fontWeight: 400 }}>
        Computer Science Engineer
      </p>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.65rem', color: '#555', fontWeight: 400, maxWidth: '200px', lineHeight: 1.5 }}>
        Building systems, interfaces, and experiences.
      </p>
      
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em' }} aria-label="Main Navigation">
        {[
          { label: 'ABOUT', target: 'BED' }, 
          { label: 'PROJECTS', target: 'LAPTOP' }, 
          { label: 'EXPERIENCE', target: 'DESK' },
          { label: 'SKILLS', target: 'LAMP' },
          { label: 'ENVIRONMENT', target: 'WINDOW' }
        ].map((item) => (
          <button 
            key={item.label}
            aria-label={`Go to ${item.label} section`}
            onClick={() => { 
                setActiveObject(item.target as any);
                setCurrentSection(item.label as any);
            }}
            style={{ 
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', color: '#888', transition: 'color 0.2s',
              fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit',
              fontWeight: 'inherit', textTransform: 'uppercase'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1a1a1a'}
            onMouseOut={(e) => e.currentTarget.style.color = '#888'}
            onFocus={(e) => e.currentTarget.style.color = '#1a1a1a'}
            onBlur={(e) => e.currentTarget.style.color = '#888'}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </nav>
  );
};

export default Navigation;
