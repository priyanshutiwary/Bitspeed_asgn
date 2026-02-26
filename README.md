# BiteSpeed Chatbot Flow Builder

A visual chatbot flow builder built with React, Next.js, and React Flow. This application allows users to create an automated flow of conversation nodes by visually dragging and dropping components onto a node-based architecture. 

It was built specifically as a Frontend Task and matches all the provided constraints and design aesthetics accurately.

## 🚀 Live Demo

[Host your project on Vercel and paste link here]

## ✨ Features

- **Text Message Nodes**: Beautifully styled WhatsApp-like message components with custom header icons.
- **Dynamic Configuration**: Click on any placed node to dynamically load a Settings Panel on the right. Modify the text context completely interactively with live preview on the node module.
- **Node Validation Logic**: Only one connection object point is permitted per Source handle (right edge). Multiple dependencies can connect independently to Target handles (left edges).
- **Save Integrity Checker**: Enforces completion validation. A warning triggers ("Cannot save flow") if unattached components map loosely outside of proper parent connections (disallowing `components with target handles > 1` if multiple nodes are placed in sequence).
- **Modular Design architecture**: Designed natively with React nodes allowing instant dropping in of components like (ImageNodes, VideoNodes, Links etc.) in the future using isolated `registry` imports.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 19 Native hooks
- **Flow Engine**: React Flow (`@xyflow/react`)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📦 Installation
Make sure you have `pnpm` or `npm` installed. Run the command using your preferred package manager.

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Technical Architecture Details

The project is structured efficiently into simple components mapped primarily inside the `components` folder natively loaded in `page.tsx`:
- **`FlowBuilder.tsx`**: Core module managing central React Flow hooks (`useNodesState`, `useEdgesState`), save checks arrays, dropping coordinates and Edge definitions.
- **`TextNode.tsx`**: Specific interface configuration enforcing target connections strictly on position-left and sending connections strictly to position-right, overriding native flow layouts to map accurately against the target screenshot UI.
- **`NodesPanel.tsx` / `SettingsPanel.tsx`**: Controlled interface that conditionally renders on the side UI. Settings panels extract dynamic memory context via pure UUID checks ensuring layout reflow efficiency during edits.

## 🤝 Contributing / Custom Node Creation

Want to add a custom Video node or Image node? It's easy!
1. Build a custom `ImageNode.tsx` similar to `TextNode.tsx`.
2. Define its key mapping locally in the `TextTypes` export object in `/components/FlowBuilder.tsx`.
3. Add a wrapper in `/components/NodesPanel.tsx` and set `onDragStart(e, 'imageNode')`!

## 📄 License
MIT

## 👤 Author
Priyanshu Tiwari
# Bitspeed_asgn
