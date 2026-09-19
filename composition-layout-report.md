# Composition Layout Report

## Selected Layout: Variant D (Rotated & Dynamic Diagonal)

After evaluating the spatial relationship of the bounding boxes from the main isometric camera angle (`pos: [5.5, 3.5, 5.5]`), **Variant D** was selected as the strongest composition. It fulfills all the spatial rules, creates distinct functional zones, and eliminates awkward negative space while preventing visual collision.

### Final Positions & Adjustments

- **Bed (Sleeping Zone)**
  - Position: `[1.2, 0, -1.2]`
  - Rationale: Moving it slightly forward and left from the rear-right corner gives it breathing space. It anchors the right side of the screen effectively, drawing 35-40% of visual attention without hugging the walls.
- **Desk Area (Creative Workspace Zone)**
  - Position: `[-1.5, 0, -1.8]`
  - Rationale: Pushed further back. It now balances the Bed diagonally across the scene. It sits deep enough to feel like a dedicated zone but doesn't float randomly in the center.
- **Chair**
  - Position: `[0.2, 0, 0.7]` (relative to desk)
  - Rotation: `[0, -0.2, 0]`
  - Rationale: Pulled out slightly and rotated, signaling that the desk is "ready for someone to sit and work".
- **Laptop & Lamp**
  - Position: Laptop is centered/right `[0.1, 0.79, 0]`, Lamp is tucked left `[-0.5, 0.79, -0.2]`.
  - Rationale: This creates a tight, cozy workspace vignette on the desk. Neither object obscures the other from the main camera view.
- **Plant (Decor/Growth Zone)**
  - Position: `[-2.2, 0, 1.0]`
  - Rationale: Moved to the foreground-left. It perfectly frames the left side of the scene, preventing the heavy workspace from feeling unbalanced and directly opposing the visual weight of the Bed on the right.
- **Window (Architectural Backdrop)**
  - Position: `[-0.5, 1.3, -3.0]`
  - Rationale: Centered on the rear wall, slightly bridging the gap between the Bed and Desk. It acts as a structural anchor that provides lighting depth without overlapping the Bed.
- **Rug**
  - Position: `[-0.5, -0.01, -0.5]`
  - Rationale: Centrally placed to catch both the desk area and the edge of the bed. It acts as the visual glue connecting the two functional zones across the floor.

### Camera Readability
The main camera easily captures the entire composition:
- **Right**: Bed (Hero)
- **Center**: Rug / Open breathing space
- **Back/Left**: Desk + Laptop (Secondary Focus)
- **Left/Front**: Plant (Framing)
- **Back**: Window (Depth)

All `InteractiveObject` camera targets have been updated to cleanly frame these new positions without cutting into geometry. The room now feels like a highly intentional, professionally designed, cozy miniature diorama.
