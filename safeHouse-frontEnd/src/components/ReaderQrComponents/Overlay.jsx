import React from 'react';

export default function ScanOverlay() {
  return (
    <svg viewBox="0 0 100 100" className="absolute z-10 p-14  inset-0 h-full ">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="2%" style={{ stopColor: 'rgb(74, 222, 128)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path fill="none" d="M13,0 L0,0 L0,13" stroke="url(#grad1)" strokeWidth="5" />
      <path fill="none" d="M0,87 L0,100 L13,100" stroke="url(#grad1)" strokeWidth="5" />
      <path fill="none" d="M87,100 L100,100 L100,87" stroke="url(#grad1)" strokeWidth="5" />
      <path fill="none" d="M100,13 L100,0 L87,0" stroke="url(#grad1)" strokeWidth="5" />
    </svg>
  );
}
