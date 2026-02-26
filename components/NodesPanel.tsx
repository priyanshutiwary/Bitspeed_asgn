'use client';

/**
 * NodesPanel Component
 * Displays available node types that can be dragged onto the canvas
 * Currently supports Text Message nodes, but designed to be extensible
 * for future node types
 */
export default function NodesPanel() {
  // Handle drag start - set the node type being dragged
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div
        className="border border-[#3b5998] rounded-md bg-white w-full max-w-[150px] flex flex-col items-center justify-center p-3 cursor-move hover:bg-gray-50 transition-colors"
        draggable
        onDragStart={(e) => onDragStart(e, 'textNode')}
      >
        <svg className="w-6 h-6 text-[#3b5998] mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-[#3b5998] font-medium text-[13px]">Message</span>
      </div>
    </div>
  );
}
