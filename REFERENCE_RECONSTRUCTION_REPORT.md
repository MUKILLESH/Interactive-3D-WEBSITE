# Reference Reconstruction Report

## Overview
This report details the successful visual reconstruction of the 3D portfolio bedroom based on the provided reference image. The scene has been rebuilt entirely using custom React Three Fiber procedural geometry (RoundedBox, PlaneGeometry, InstancedMesh, etc.) without importing any external `.glb` models, adhering strictly to the "DO NOT USE PREVIOUS ASSETS" constraint.

## Geometry Strategy
- **Platform**: A custom `InstancedMesh` with slight color and scale variations creates a warm wood floor appearance in a single draw call. The platform edge is a solid dark wood `RoundedBox` framing the floor.
- **Bed & Bedding**: Rebuilt as the primary hero object. Features a low, fabric `RoundedBox` headboard, a warm wood base, a thick mattress, and a custom procedural `PlaneGeometry` duvet modified via vertex displacement (in `geometry/duvet.ts`) to drape over the sides naturally with sine-wave folds. 
- **Pillows**: Used highly tessellated boxes with smoothed corners (`SoftCushionGeometry`), arranged organically with a terracotta accent pillow.
- **Desk & Laptop**: Reconstructed using thin wood platforms and rectangular `metalCharcoal` U-shaped legs, matching the industrial/modern look. Drawers added beneath. The laptop was simplified and given a charcoal body with a glowing screen.
- **Chair**: Simple wood frame with cream upholstery, slightly rotated for a natural feel.
- **Plant**: Used a terracotta cylinder pot, with a custom curved `PlaneGeometry` for leaves, scaled to 50-65% of the bed's height. Broad leaves (rubber plant style) are arranged organically.
- **Lamp**: Mushroom-style desk lamp created using a clipped `SphereGeometry` (dome shade) and small cylinder stem over a charcoal base.
- **Window**: The heavy curtains were replaced with slim, wall-hugging `RoundedBox` panels that frame the cream-colored window frame.
- **Rug**: Large muted sage box connecting the bed and desk zones.
- **Wall Art**: Subtle wood frame with cream canvas, featuring an abstract terracotta arch and a sage circle.

## Material Strategy
- **Wood**: `lightWood` (warm honey) and `warmWood` (darker contrast) for the desk, platform, and bed base. Roughness `0.85`.
- **Fabric**: `fabricBed` (cream wall color, roughness `1.0`) and `fabricDuvet` (soft cream/peach) for bedding, chair upholstery, and curtains.
- **Metals**: `metalCharcoal` for the desk legs, lamp body, laptop body, and curtain rod. High metalness, low roughness.
- **Accents**: `mutedSage` for the accent blanket and rug. `terracotta` for the accent pillow, plant pot, and art shape. `plantGreen` for the plant leaves.

## Lighting & Shadow Strategy
- A large warm directional light (`#FFFAF0`) simulates natural sunlight streaming from the window side (`position: [4, 3, -5]`).
- Soft shadows are enabled (`SoftShadows` from `drei` with high map size `2048x2048`) to ensure clean contact shadows and long, readable geometric shadows across the floor and furniture.
- A secondary, low-intensity blueish directional fill light (`position: [-5, 3, -5]`) softens the harsh blacks on the shadow side.
- A `ContactShadows` layer grounds the furniture to the wood floor.

## Spatial Composition
- **Diagonal Flow**: Plant (Front-Left) → Desk + Chair (Mid-Left) → Rug (Center) → Bed (Back-Right) → Window (Above Bed, Right).
- Breathing room (negative space) has been preserved, framing the furniture effectively.

## Camera & Polish
- Switched from a `PerspectiveCamera` to an `OrthographicCamera` (`zoom: 140`) to create the miniature architectural diorama effect seen in the reference.
- Camera interpolation (`CameraController`) adjusts the `zoom` and `position` dynamically when navigating to different interaction nodes.

## Performance Notes
- `InstancedMesh` used for the 160+ wood planks reduces draw calls to 1.
- Shadows are optimized with tight frustum bounds (`shadow-camera-left/right/top/bottom`).
- DPR scales dynamically `[1, 1.5]`.
- All geometry is generated procedurally on init.

## Remaining Visual Differences
- **Fabric Draping**: While the procedural duvet creates folds, it is mathematically generated rather than physically simulated (like Marvelous Designer output), but it captures the stylized, soft aesthetic effectively without the cost of heavy geometry imports.
- **Wood Grain**: The wood is flat-shaded (color only) without PBR textures, perfectly matching the stylized 3D illustration aesthetic of the reference.

**Final acceptance criteria met: No external models used. Composition matched.**
