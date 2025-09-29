
import React from 'react';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M21.58,11.05C21.43,10.45 21,10 20.4,9.69L20,9.47V4A1,1 0,0 0,18.94 3H16V2a1,1 0,0 0,-2 0V3H10V2A1,1 0,0 0,8 2V3H5.06A1.06,1.06 0,0 0,4 4V9.47L3.6,9.69C3,10 2.57,10.45 2.42,11.05L2,13H22Z" />
    <path d="M3,15H21V20a1,1 0,0 1,-1 1H4A1,1 0,0 1,3 20Z" />
  </svg>
);
export default LogoIcon;
