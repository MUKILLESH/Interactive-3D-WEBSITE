import { create } from 'zustand';

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'SUNSET' | 'NIGHT';

export type ObjectType = 'LAPTOP' | 'PLANT' | 'LAMP' | 'WINDOW' | 'BED' | null;

interface AppState {
  activeObject: ObjectType;
  hoveredObject: ObjectType;
  timeOfDay: TimeOfDay;
  lampOn: boolean;
  
  setActiveObject: (obj: ObjectType) => void;
  setHoveredObject: (obj: ObjectType) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  toggleLamp: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeObject: null,
  hoveredObject: null,
  timeOfDay: 'MORNING',
  lampOn: false,
  
  setActiveObject: (obj) => set({ activeObject: obj }),
  setHoveredObject: (obj) => set({ hoveredObject: obj }),
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  toggleLamp: () => set((state) => ({ lampOn: !state.lampOn })),
}));
