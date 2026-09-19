---
name: Web Artifacts Builder
description: "Use when the user asks to build a self-contained interactive web artifact, prototype, component, or browser experience inside the generated VULK project."
does: "Builds the requested interface and its complete interaction path"
delivers: "A working web artifact inside the project"
icon: Browser
tags: [web, ui, prototype]
trigger: automatic
publisher: VULK
capabilities:
  readsProject: true
  writesProject: true
  network: false
  runsScripts: false
---

# Web Artifacts Builder

Use this skill when the user requests a working browser artifact rather than a description or static mockup. An artifact may be a page, flow, dashboard, form, interactive component, data view, or small browser-based tool within a VULK-generated project.

Start by translating the request into user-visible states and actions. Identify the primary path, empty and error states, responsive behavior, data shape, and persistence expectations. Reuse the project’s existing framework, routing, styling conventions, components, and generated backend instead of introducing a second application structure.

Build the smallest complete path first. Keep state transitions explicit, validate user input at the boundary, and provide feedback after mutations. Do not replace real backend behavior with local state when the request implies persistence, authentication, collaboration, or server-side work. If a backend is not available, mark the limitation in the implementation rather than implying that data is saved.

Use semantic HTML and keyboard-accessible controls. Test narrow and wide layouts, loading behavior, invalid input, refresh behavior, and failure responses. Run the project’s existing checks or preview commands when available, and fix errors they reveal. Do not download dependencies or external assets without a project-level reason and an allowed source.

This skill reads and modifies project files and may run local project scripts. It does not call external network services.
