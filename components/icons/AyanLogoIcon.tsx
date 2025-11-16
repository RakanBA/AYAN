import type React from 'react';

export const AyanLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(0, -10)">
      {/* Fortress */}
      <g fill="#B89A5E">
        {/* Base */}
        <path d="M60 110 h80 v -30 h-80 z" />
        {/* Arch */}
        <path d="M92 110 a8 8 0 0 0 16 0 v -10 h-16 z" fill="#8c734b" />
        {/* Towers */}
        <path d="M60 80 h20 v-20 h-20 z" />
        <path d="M120 80 h20 v-20 h-20 z" />
        <path d="M90 80 h20 v-25 h-20 z" />
        {/* Battlements */}
        <path d="M90 55 h5 v-5 h-5 z M105 55 h5 v-5 h-5 z" />
        <path d="M60 60 h5 v-5 h-5 z M75 60 h5 v-5 h-5 z" />
        <path d="M120 60 h5 v-5 h-5 z M135 60 h5 v-5 h-5 z" />
        {/* Windows */}
        <g fill="#8c734b">
          <rect x="94" y="62" width="4" height="8" />
          <rect x="102" y="62" width="4" height="8" />
          <rect x="94" y="82" width="4" height="8" />
          <rect x="102" y="82" width="4" height="8" />
        </g>
      </g>
      {/* Scan Brackets */}
      <g stroke="#2A5A4A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M50 40 h -20 a 10 10 0 0 0 -10 10 v 20" />
        <path d="M150 40 h 20 a 10 10 0 0 1 10 10 v 20" />
        <path d="M50 120 h -20 a 10 10 0 0 1 -10 -10 v -20" />
        <path d="M150 120 h 20 a 10 10 0 0 0 10 -10 v -20" />
      </g>
    </g>
    {/* AYAN Text */}
    <text 
      x="100" y="170" 
      fontFamily="sans-serif"
      fontSize="40" 
      fontWeight="bold" 
      fill="#2A5A4A" 
      textAnchor="middle"
      letterSpacing="2"
    >
      AYAN
    </text>
  </svg>
);
