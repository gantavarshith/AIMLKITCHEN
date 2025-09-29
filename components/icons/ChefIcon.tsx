
import React from 'react';

const ChefIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,12,2Zm5,12.5a.5.5,0,0,1-.5.5h-9a.5.5,0,0,1-.5-.5V14a.5.5,0,0,1,.5-.5H8v-.5a4,4,0,0,1,8,0v.5h.5a.5.5,0,0,1,.5.5Z" />
  </svg>
);

export default ChefIcon;
