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

Want to add a custom Video node, Image node, or any other node type? The architecture now uses a centralized configuration system that makes it incredibly easy!

### Adding a New Node Type (3 Simple Steps)

**Step 1: Create Your Node Component**

Create a new file `components/YourNode.tsx`:

```typescript
'use client';
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

function YourNode({ data, selected }: NodeProps) {
  return (
    <div className={`shadow-md rounded-md bg-white min-w-[250px] ${selected ? 'ring-1 ring-blue-500' : ''}`}>
      <div className="flex items-center justify-between px-3 py-1 bg-[#yourColor]">
        <div className="text-[11px] font-bold">Your Node Type</div>
      </div>
      <div className="px-3 py-3 text-xs text-gray-700">
        {String(data.label || 'default text')}
      </div>
      <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 bg-gray-400 border-0" />
      <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 bg-gray-400 border-0" />
    </div>
  );
}

export default memo(YourNode);
```

**Step 2: Register in FlowBuilder**

Add your node to the `nodeTypes` object in `components/FlowBuilder.tsx`:

```typescript
import YourNode from './YourNode';

const nodeTypes: NodeTypes = {
  textNode: TextNode,
  aiNode: AiNode,
  yourNode: YourNode,  // Add this line
};
```

**Step 3: Add to Node Configuration**

Add an entry to `nodeConfigs` in `components/nodeConfig.tsx`:

```typescript
export const nodeConfigs: Record<string, NodeConfig> = {
  // ... existing nodes
  yourNode: {
    type: 'yourNode',
    label: 'Your Node',
    displayName: 'Your Node Display',
    color: '#f59e0b',
    defaultData: { label: 'Your default text' },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Your SVG icon path */}
      </svg>
    ),
  },
};
```

That's it! Your new node will automatically:
- Appear in the nodes panel
- Be draggable onto the canvas
- Use the correct default data when dropped
- Work with all existing flow features

No need to modify `NodesPanel.tsx` or add conditional logic in `FlowBuilder.tsx` - the configuration handles everything!

## 📄 License
MIT

## 👤 Author
Priyanshu Tiwari
# Bitspeed_asgn
