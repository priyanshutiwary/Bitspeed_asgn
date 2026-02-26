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

## 🤝 Adding Your Own Node Types

Want to add a video node, image node, or something completely custom? I've set up a config-based system that makes this super straightforward.

### How to Add a New Node

**Step 1: Build the node component**

Create a new file like `components/VideoNode.tsx`. You can copy `TextNode.tsx` as a starting point and customize it:

```typescript
'use client';
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

function VideoNode({ data, selected }: NodeProps) {
  return (
    <div className={`shadow-md rounded-md bg-white min-w-[250px] ${selected ? 'ring-1 ring-blue-500' : ''}`}>
      <div className="flex items-center justify-between px-3 py-1 bg-purple-200">
        <div className="text-[11px] font-bold">Send Video</div>
      </div>
      <div className="px-3 py-3 text-xs text-gray-700">
        {String(data.label || 'video message')}
      </div>
      <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 bg-gray-400 border-0" />
      <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 bg-gray-400 border-0" />
    </div>
  );
}

export default memo(VideoNode);
```

**Step 2: Register it in FlowBuilder**

Open `components/FlowBuilder.tsx` and add your node to the `nodeTypes` object:

```typescript
import VideoNode from './VideoNode';

const nodeTypes: NodeTypes = {
  textNode: TextNode,
  aiNode: AiNode,
  videoNode: VideoNode,  // just add this
};
```

**Step 3: Add it to the config**

Open `components/nodeConfig.tsx` and add an entry for your new node:

```typescript
export const nodeConfigs: Record<string, NodeConfig> = {
  // ... existing nodes
  videoNode: {
    type: 'videoNode',
    label: 'Video',
    displayName: 'Send Video',
    color: '#a855f7',
    defaultData: { label: 'Video message' },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
};
```

Done! Your new node will show up in the panel, work with drag-and-drop, and use the right default values. The config system handles all the wiring automatically, so you don't need to touch `NodesPanel.tsx` or add any conditional checks.

## 📄 License
MIT

## 👤 Author
Priyanshu Tiwari
# Bitspeed_asgn
