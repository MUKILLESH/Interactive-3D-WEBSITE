
import { usePortfolioStore } from '../state/usePortfolioStore';

const AccessibilityFallback = () => {
  const { setActiveObject, currentSection } = usePortfolioStore();

  return (
    <div className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
      <h1>Mukillesh - Interactive Portfolio</h1>
      <nav>
        <button onClick={() => setActiveObject('NONE')}>Home</button>
        <button onClick={() => setActiveObject('BED')}>About (Rest)</button>
        <button onClick={() => setActiveObject('LAPTOP')}>Projects</button>
        <button onClick={() => setActiveObject('LAMP')}>Skills</button>
        <button onClick={() => setActiveObject('WINDOW')}>Change Time of Day</button>
      </nav>
      <div aria-live="polite">
        Current section: {currentSection}
      </div>
    </div>
  );
};

export default AccessibilityFallback;
