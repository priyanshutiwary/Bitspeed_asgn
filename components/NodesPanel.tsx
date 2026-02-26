'use client';

import { nodeConfigs } from './nodeConfig';

/**
 * NodesPanel Component
 * Displays available node types that can be dragged onto the canvas
 * Automatically renders all nodes defined in nodeConfig
 */
export default function NodesPanel() {
  // Handle drag start - set the node type being dragged
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {Object.values(nodeConfigs).map((config) => (
        <div
          key={config.type}
          className="border rounded-md bg-white w-full flex flex-col items-center justify-center p-3 cursor-move hover:bg-gray-50 transition-colors"
          style={{ borderColor: config.color }}
          draggable
          onDragStart={(e) => onDragStart(e, config.type)}
        >
          <div style={{ color: config.color }} className="mb-1.5">
            {config.icon}
          </div>
          <span className="font-medium text-[13px]" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
      ))}
    </div>
  );
}
