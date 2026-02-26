'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  MarkerType,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import { nodeConfigs } from './nodeConfig';

// Define custom node types
const nodeTypes: NodeTypes = {
  textNode: TextNode
};

// Use highly unique IDs to avoid HMR overlap preventing valid edges
const getId = () => `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an edge
      const sourceHasEdge = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );

      if (sourceHasEdge) {
        alert('A source handle can only have one outgoing connection');
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle pane click (deselect node)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle drag over for drop functionality
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop to add new node
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const config = nodeConfigs[type];
      if (!config) return; // Safety check

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: getId(),
        type: config.type,
        position,
        data: { ...config.defaultData },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Update node text from settings panel
  const updateNodeText = useCallback(
    (nodeId: string, text: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, label: text },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Save flow with validation
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = useCallback(() => {
    // If there is more than 1 node, check how many nodes lack incoming edges
    if (nodes.length > 1) {
      const nodesWithoutTarget = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithoutTarget.length > 1) {
        setSaveError(true);
        setSaveSuccess(false);
        setTimeout(() => setSaveError(false), 3000);
        return;
      }
    }

    setSaveError(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, [nodes, edges]);

  return (
    <div className="flex flex-col h-screen w-full font-sans overflow-hidden bg-white">
      {/* Top Header */}
      <div className="flex items-center px-16 py-2 bg-[#f3f4f6] border-b border-gray-300">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-center h-8">
          {saveError && (
            <div className="px-5 py-1.5 bg-[#ffcccb] text-gray-800 font-bold rounded-md text-[13px] flex items-center shadow-sm">
              Cannot save Flow
            </div>
          )}
          {saveSuccess && (
            <div className="px-5 py-1.5 bg-green-200 text-gray-800 font-bold rounded-md text-[13px] flex items-center shadow-sm">
              Saved successfully!
            </div>
          )}
        </div>
        <div className="w-1/3 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-1.5 bg-white text-[#3b5998] border border-[#3b5998] rounded-md hover:bg-gray-50 text-[13px] font-bold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Main flow area */}
        <div className="flex-1 relative bg-white">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
              },
            }}
            fitView
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Right panel - either Nodes Panel or Settings Panel */}
        <div className="w-96 border-l border-gray-300 bg-white shadow-xl z-20">
          {selectedNode ? (
            <SettingsPanel
              key={selectedNode.id}
              node={selectedNode}
              onUpdateText={updateNodeText}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
}
