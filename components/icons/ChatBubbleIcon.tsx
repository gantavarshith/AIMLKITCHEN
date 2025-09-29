
import React from 'react';

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A2.122 2.122 0 013 15.118V10.608c0-.97.616-1.813 1.5-2.097m16.5 0a2.121 2.121 0 00-2.121-2.121H6.621A2.121 2.121 0 004.5 8.511m16.5 0v.001M6.621 6.39L6 6.389a2.121 2.121 0 00-2.121 2.121v.001" />
  </svg>
);

export default ChatBubbleIcon;