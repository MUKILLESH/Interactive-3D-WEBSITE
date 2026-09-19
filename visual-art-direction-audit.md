# Visual Art Direction Audit

## 1. Window Origin & Alignment
- **Problem:** The window model is floating awkwardly in front of the wall. The curtain rod extends into mid-air over the bed.
- **Why it looks bad:** Breaks all architectural reality. It looks like a broken game asset.
- **Proposed Fix:** Isolate the window mesh geometry, adjust its position/scale precisely into the wall cutout, or rebuild a stylized window frame manually if the GLB pivot is unfixable.
- **Expected Improvement:** Believable architectural anchor for the sunlight.

## 2. Furniture Scale vs Room Scale
- **Problem:** The room is massive (`10.6 x 9.6`), making the bed and desk look tiny and clumped.
- **Why it looks bad:** Loses the "cozy miniature diorama" feel. It feels like a warehouse.
- **Proposed Fix:** Scale the imported furniture up to `4.5` (from `3.5`) and pull the walls in tighter.
- **Expected Improvement:** The bed becomes the dominant hero object, increasing coziness.

## 3. Bedding Geometry & Normals
- **Problem:** The decimated duvet looks jagged, plastic, and malformed.
- **Why it looks bad:** It reads as low-poly slop rather than soft, inviting fabric.
- **Proposed Fix:** Apply `MeshPhysicalMaterial` with higher roughness, subtle clearcoat, and enable `flatShading={false}` to smooth normals. We may need to hide the worst parts of the duvet or adjust camera angle.
- **Expected Improvement:** The bed feels tactile and comfortable.

## 4. Desk Silhouette & Laptop
- **Problem:** The desk is a generic brown block. The laptop intersects it slightly.
- **Why it looks bad:** Lacks detail and looks like primitive placeholder geometry.
- **Proposed Fix:** Add a subtle bevel/rim to the desk material. Precisely ground the laptop using a contact shadow (`ContactShadows` from drei).
- **Expected Improvement:** Grounded, realistic object relationships.

## 5. Material Flatness
- **Problem:** Every surface uses a flat `MeshStandardMaterial`. There's no material distinction between wood, fabric, and plastic.
- **Why it looks bad:** Looks like an unrendered clay pass or a developer demo.
- **Proposed Fix:** 
  - **Wood:** `MeshPhysicalMaterial` with low roughness, subtle clearcoat.
  - **Fabric:** `MeshLambertMaterial` or high-roughness Standard with a warmer color.
  - **Metal/Screen:** Slight metalness, emissive glow for the screen.
- **Expected Improvement:** Sophisticated, tactile rendering.

## 6. Monochromatic Floor
- **Problem:** The floor is a solid, uninteresting `#dfbe9f` slab.
- **Why it looks bad:** Contributes to the "roblox" aesthetic.
- **Proposed Fix:** Add a subtle grid or plank texture, or at least break up the specular highlights.
- **Expected Improvement:** Grounding the scene with a premium architectural feel.

## 7. Shadow Harshness
- **Problem:** The directional shadow is sharp and cuts aggressively across the room.
- **Why it looks bad:** Too sterile; lacks cinematic bounce light.
- **Proposed Fix:** Increase shadow map softness (PCF), add a subtle warm point light near the bed to act as bounce illumination (GI fake).
- **Expected Improvement:** Richer, cinematic volume.

## 8. Floating Clutter
- **Problem:** The clutter frames are hidden because they float in mid-air.
- **Why it looks bad:** The scene is too empty without secondary details.
- **Proposed Fix:** Manually place 1 or 2 small primitive geometric accents (a tiny cylinder for a mug, a small box for a book) instead of relying on the broken `clutter.glb`.
- **Expected Improvement:** Lived-in coziness without broken geometry.

## 9. Platform Base Design
- **Problem:** The platform is too thick and has no styling.
- **Why it looks bad:** Looks like a heavy slab rather than a delicate miniature display.
- **Proposed Fix:** Thin out the base, use the premium blonde wood, and add a subtle glowing rim or strong contact shadow underneath.
- **Expected Improvement:** Elevates the scene to an "art piece".

## 10. Camera Framing (Too High)
- **Problem:** The elevation at `12` is still too top-down.
- **Why it looks bad:** Flattens the verticality of the window and bed.
- **Proposed Fix:** Lower camera to `[15, 8, 15]` and point the target slightly higher.
- **Expected Improvement:** Heroic, immersive framing.

## 11. Overexposed Wall
- **Problem:** The left wall is catching too much light and washing out.
- **Why it looks bad:** Ruins the contrast gradient across the room.
- **Proposed Fix:** Tweak the directional light azimuth/angle to graze the wall rather than hit it head-on.
- **Expected Improvement:** Moodier, dramatic lighting.

## 12. Lack of Ambient Occlusion
- **Problem:** Corners where walls meet floor lack depth.
- **Why it looks bad:** Looks ungrounded and flat.
- **Proposed Fix:** If post-processing is too heavy, we can add a subtle baked AO plane or use Drei's `ContactShadows` across the floor.
- **Expected Improvement:** Substantial depth and realism.

## 13. Window Cutout Alignment
- **Problem:** The procedural wall cutout does not match the actual window GLB dimensions.
- **Why it looks bad:** Creates weird gaps or clipping.
- **Proposed Fix:** Completely rebuild the wall cutout geometry using exact `RoundedBox` measurements to perfectly hug the window frame.
- **Expected Improvement:** Seamless architectural integration.

## 14. Bed Placement (Negative Space)
- **Problem:** Bed is pushed too far left, leaving dead space on the right.
- **Why it looks bad:** Unbalanced composition.
- **Proposed Fix:** Center the bed slightly more on the Z-axis, tighten the desk towards it.
- **Expected Improvement:** Cohesive central focal point.

## 15. Laptop Screen Heroism
- **Problem:** The laptop screen is dark and blends in.
- **Why it looks bad:** Loses its status as a secondary interactive hero.
- **Proposed Fix:** Apply a glowing `MeshBasicMaterial` (cyan/white) to the screen node.
- **Expected Improvement:** Clear visual hierarchy drawing the eye.
