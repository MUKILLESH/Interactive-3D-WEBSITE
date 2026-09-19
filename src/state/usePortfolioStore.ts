import { create } from 'zustand';

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'SUNSET' | 'NIGHT';
export type Section = 'HOME' | 'ABOUT' | 'PROJECTS' | 'SKILLS' | 'CONTACT' | 'EXPERIENCE' | 'INTERESTS';
export type ObjectType = 'NONE' | 'BED' | 'LAPTOP' | 'PLANT' | 'LAMP' | 'DESK' | 'WINDOW' | 'BOOKSHELF' | 'HEADPHONES';

interface PortfolioState {
  activeObject: ObjectType;
  hoveredObject: ObjectType;
  currentSection: Section;
  timeOfDay: TimeOfDay;
  lampOn: boolean;
  isLoading: boolean;
  isTransitioning: boolean;
  
  setActiveObject: (obj: ObjectType) => void;
  setHoveredObject: (obj: ObjectType) => void;
  setCurrentSection: (section: Section) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  toggleLamp: () => void;
  setIsLoading: (loading: boolean) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  cycleTimeOfDay: () => void;
}

const timeCycle: TimeOfDay[] = ['MORNING', 'AFTERNOON', 'SUNSET', 'NIGHT'];

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeObject: 'NONE',
  hoveredObject: 'NONE',
  currentSection: 'HOME',
  timeOfDay: 'MORNING',
  lampOn: false,
  isLoading: true,
  isTransitioning: false,
  
  setActiveObject: (activeObject) => set({ activeObject }),
  setHoveredObject: (hoveredObject) => set({ hoveredObject }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
  toggleLamp: () => set((state) => ({ lampOn: !state.lampOn })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  
  cycleTimeOfDay: () => set((state) => {
    const currentIndex = timeCycle.indexOf(state.timeOfDay);
    const nextIndex = (currentIndex + 1) % timeCycle.length;
    return { timeOfDay: timeCycle[nextIndex] };
  }),
}));
