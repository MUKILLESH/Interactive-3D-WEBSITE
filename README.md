# Interactive 3D Portfolio

This is a premium, AWWWARDS-quality interactive 3D portfolio built with React Three Fiber, Three.js, and GSAP.

The environment (a miniature diorama of a stylized bedroom) functions as the primary navigation. It uses custom procedural geometry to create a warm, tactile, and deeply intentional design language.

## Technology Stack

- **Core**: React 19, TypeScript, Vite
- **3D Rendering**: Three.js, React Three Fiber
- **3D Helpers**: `@react-three/drei` (RoundedBox, SoftShadows)
- **Animation & State**: GSAP for cinematic overlays, Zustand for state management

## Architecture

- **`src/scene/`**: Procedurally generated hero objects (Bed, Desk, Laptop, Plant, Lamp, Window) that form the diorama.
- **`src/geometry/`**: Custom BufferGeometry generators (duvet folds, cushions, lamp shades, leaves) replacing bloated 3D models.
- **`src/materials/`**: A centralized material palette based on physical properties, minimizing texture payloads while maximizing aesthetic richness.
- **`src/interaction/`**: The core `InteractiveObject` and `CameraController` which handle hover states, selection, and smooth camera orchestration.
- **`src/components/`**: Clean DOM overlays for portfolio content, navigation, and loading states.
- **`src/state/`**: A Zustand store tracking time of day, active objects, and UI sections.

## How to Run

1. `npm install`
2. `npm run dev`
3. Open `localhost:5173`

## How to Build

1. `npm run build`
2. `npm run preview`

## Performance Notes

- This project deliberately avoids large textures and heavy imported assets in favor of procedural geometry and unified materials.
- Shadows are optimized using baked configurations and `dpr={[1, 1.5]}` adaptive resolution mapping.
- Geometry uses efficient `useMemo` caching to minimize instantiation overhead.
