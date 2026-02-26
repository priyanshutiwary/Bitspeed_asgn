import React from 'react';

export interface NodeConfig {
  type: string;
  label: string;
  displayName: string;
  icon: React.ReactNode;
  color: string;
  defaultData: Record<string, any>;
}

export const nodeConfigs: Record<string, NodeConfig> = {
  textNode: {
    type: 'textNode',
    label: 'Message',
    displayName: 'Send Message',
    color: '#3b5998',
    defaultData: { label: 'Send Message' },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
//   aiNode: {
//     type: 'aiNode',
//     label: 'AI Assistant',
//     displayName: 'AI Response',
//     color: '#10b981',
//     defaultData: { label: 'AI Response' },
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
//           d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//       </svg>
//     ),
//   },
};
