'use client';

import { useState } from 'react';
import { Node } from '@xyflow/react';

interface SettingsPanelProps {
  node: Node;
  onUpdateText: (nodeId: string, text: string) => void;
  onClose: () => void;
}

export default function SettingsPanel({ node, onUpdateText, onClose }: SettingsPanelProps) {
  const [text, setText] = useState(node.data.label as string || '');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onUpdateText(node.id, newText);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-300 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute left-4"
          aria-label="Back to nodes panel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h3 className="text-[15px] font-medium text-gray-800 flex-1 text-center">Message</h3>
      </div>

      {/* Text editor */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-[#a0a0a0] text-[13px] mb-2">
          Text
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-24 p-2 text-[13px] text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-400 resize-none"
        />
      </div>
    </div>
  );
}
