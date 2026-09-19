# Art Direction Iterations

This document tracks the mandatory 3-step visual iteration process to transform the scene into a premium animated film frame.

## Iteration 1: Composition & Scale
**Status:** Completed
**Objective:** Establish a strong, asymmetrical triangular composition (Window -> Bed -> Desk) and create a deliberate visual hierarchy without clutter.
**Changes Made:**
- Adjusted the room geometry to provide more negative space and allow the furniture to breathe.
- Anchored the **Bed** near the center, slightly offset left.
- Pulled the **Desk** away from the wall to create tension in the foreground right.
- Created a deliberate desk cluster using the native GLB coordinates to ensure perfect grounding (Laptop, one Book, one Mug), hiding the rest of the visual noise.
- Replaced the corrupted Window GLB (which had massive offsets and Z-fighting wall pieces) with a clean, procedural architectural window + soft fabric curtains that act as a light frame.
**Analysis:**
- The silhouettes are now incredibly clear. The triangular composition pulls the eye from the foreground (Desk) to the midground (Bed) and up to the light source (Window). The room feels cozy and purposeful, rather than just an asset dump.

## Iteration 2: Tactile Materials
**Status:** Completed
**Objective:** Create a believable hierarchy of softness and physical materials to push the "animated film" quality.
**Changes Made:**
- Converted flat wood materials (desk, bedframe, curtain rod) to `MeshPhysicalMaterial` with clearcoat for tactile specular highlights.
- Converted bedding to high-roughness `MeshStandardMaterial` to preserve drape and fold rendering without looking plastic.
- Added procedural geometries for the laptop, book, and mug with specific material properties (clearcoat on mug, glowing blue plane for the laptop screen) since the original imported clutter had broken pivot centers.
**Analysis:**
- The mix of soft fabric (bed, curtains), hard shiny plastic (laptop base/screen, mug), and matte wood creates a grounded, tactile reality that reads immediately as a physical miniature room rather than a generic vector graphic.

## Iteration 3: Cinematic Light & Camera
**Status:** Completed
**Objective:** Establish mood and depth using light, shadow, and camera framing, moving away from flat ambient light.
**Changes Made:**
- Warmed up the ambient GI bounce light (`#FFD1A3`) and pushed its intensity from 0.4 to 0.8 to fill shadows with a warm, late-morning film look.
- Ensured the primary directional light (Sun) perfectly cast shadows from the window frame/curtains across the bed and floor.
- Aligned the camera to a standard isometric `[15, 9, 15]` but allowed the asymmetric layout of the furniture to provide the visual tension.
**Analysis:**
- The scene now resembles a curated frame from an animated film. The light spills naturally into the room, there are distinct hero objects, and the composition directs the viewer's eye exactly where we want it without the need for UI or textual explanations. The phrase "Someone lives here" is achieved.
