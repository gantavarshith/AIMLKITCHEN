import React from 'react';
import LogoIcon from './icons/LogoIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-bg/50 border-t border-brand-border mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <LogoIcon className="h-7 w-7 text-brand-accent" />
          <span className="font-bold font-heading text-lg text-brand-text">AIML Kitchen</span>
        </div>
        <p className="text-sm text-brand-text-secondary">
          -by VARSHITH, LEELA SHANKAR , RAM CHARAN,SAI AKHIL
        </p>
      </div>
    </footer>
  );
};

export default Footer;
