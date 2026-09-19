# Design System

This document outlines the visual choices behind the Interactive 3D Portfolio.

## Colors

- **Warm Cream (`#F4EBDD`)**: Primary backdrop and wall color.
- **Light Wood (`#E7D4B5`)**: Platform and inner window frames.
- **Warm Wood (`#B88A68`)**: Desk accents and bed frames.
- **Muted Sage (`#A8B89A`)**: The central rug.
- **Soft Peach (`#DFA58C`)**: Duvet accents, creating warmth.
- **Terracotta (`#C9795B`)**: Plant pot and small props.
- **Charcoal (`#3A3431`)**: High contrast typography and metal accents.

## Typography

- **Primary Font**: `Inter` (sans-serif)
- Clean, highly legible, emphasizing content without distracting from the 3D diorama.
- Minimal tracking for headings (`letter-spacing: -0.02em`).

## Geometry Language

- **Rounded Forms**: Absolutely no sharp corners. `RoundedBox` is used extensively for walls, desks, and frames.
- **Soft Surfaces**: The bed duvet uses procedural sine waves for organic drape. Pillows and cushions utilize puffed box geometries for a soft, tactile feel.
- **Silhouette Focus**: The laptop, lamp, and plant were built hierarchically to ensure distinct, recognizable silhouettes.

## Materials

- **Matte & Tactile**: Standard materials are favored over physical materials to control roughness (0.7 - 1.0).
- **Glass & Emissive**: The windowpane uses transmission to simulate glass, and the laptop screen uses emissive intensity that animates upon hover.

## Lighting

The scene relies on a cinematic Time of Day system controlling an Ambient Light and a Directional Light (Sun).
- **Morning**: Warm, high-intensity sunlight with sharp shadows.
- **Afternoon**: Neutral, balanced daylight.
- **Sunset**: Peach/orange directional rays, moody atmosphere.
- **Night**: Cool blue environment with warm, localized emissive lighting from the lamp and laptop.

## Animation Principles

- **Micro-interactions**: Subtle scaling (1.02 to 1.05) and color shifts on hover.
- **Camera Movement**: Using GSAP and `lerp` over 600–1200ms for smooth transitions between hero objects. No sudden cuts.
