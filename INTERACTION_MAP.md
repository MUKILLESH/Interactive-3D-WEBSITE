# Interaction Map

The 3D bedroom functions as a spatial interface. Users explore the portfolio by interacting with specific hero objects.

## Core Interactions

### BED → REST / ABOUT
- **Hover**: Subtle scale increase.
- **Click**: Camera pans down to the bed; "About" overlay appears.

### LAPTOP → PROJECTS
- **Hover**: Laptop screen glows brighter.
- **Click**: Camera focuses on the desk/laptop; "Projects" overlay appears.

### PLANT → ABOUT / GROWTH
- **Hover**: Leaves gently sway (sine wave animation).
- **Click**: Camera focuses on the plant; "About" overlay appears.

### LAMP → FOCUS / SKILLS
- **Hover**: Subtle scale response.
- **Click**: The lamp toggles on/off, emitting a warm glow; Camera focuses; "Skills" overlay appears.

### WINDOW → TIME
- **Hover**: Subtle scale response.
- **Click**: Instantly triggers the next Time of Day state (Morning -> Afternoon -> Sunset -> Night). The global lighting animates smoothly to reflect the new time. No UI overlay appears.

## Navigation Recovery

- Clicking the "Mukillesh" header in the top-left (or closing the current overlay) resets the active object, pulling the camera back to its default isometric, diorama-view position.
