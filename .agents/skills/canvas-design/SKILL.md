---
name: Canvas Design
description: "Use when the user asks for a visual composition, interactive canvas, spatial editor, diagram, drawing surface, or other deliberate on-screen visual arrangement."
does: "Shapes visual surfaces, interactions, and spatial behavior"
delivers: "A responsive canvas with clear, usable interactions"
icon: PaintBrush
tags: [design, canvas, interaction]
trigger: automatic
publisher: VULK
capabilities:
  readsProject: true
  writesProject: true
  network: false
  runsScripts: false
---

# Canvas Design

Use this skill when the requested product depends on a visual surface rather than a conventional form or document layout. This includes drawing tools, diagrams, node editors, whiteboards, spatial collections, composition boards, and interactive visual scenes.

Before writing code, identify the canvas model: objects, coordinates, selection, grouping, ordering, zoom, pan, editing, and persistence. Define the smallest useful interaction set and make its states visible. Empty, selected, dragging, focused, disabled, loading, and error states must each have an intentional presentation.

Choose an implementation that matches the generated project. Prefer ordinary DOM and CSS when accessibility, text selection, and responsive layout matter. Use SVG for structured vector content and relationships. Use a canvas renderer only when the number or nature of objects requires it. Do not use a canvas element as an excuse to hide controls from keyboard or assistive technology users.

Keep the visual hierarchy clear at every zoom level. Provide a stable toolbar, discoverable controls, and an accessible alternative for important object data or actions. Avoid decorative motion that competes with manipulation. Preserve user changes through the project’s existing state and persistence mechanisms.

This skill may read and modify project files. It does not fetch remote assets, call external services, or execute scripts.
