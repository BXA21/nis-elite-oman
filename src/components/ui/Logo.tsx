import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="100%" height="100%" {...props}>
      <defs>
        <linearGradient id="topArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0"/>
          <stop offset="30%" stopColor="#94A3B8"/>
          <stop offset="100%" stopColor="currentColor"/>
        </linearGradient>
        <linearGradient id="bottomArcGrad" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0"/>
          <stop offset="30%" stopColor="#94A3B8"/>
          <stop offset="100%" stopColor="currentColor"/>
        </linearGradient>
      </defs>

      <g transform="translate(0, -20)">
        {/* Top Arc */}
        <path d="M 200,120 A 180,180 0 0,1 600,120" fill="none" stroke="url(#topArcGrad)" strokeWidth="12" strokeLinecap="round"/>
        
        {/* Right side piston */}
        <g transform="translate(600, 110)">
          {/* Connecting rod joint */}
          <circle cx="0" cy="10" r="14" fill="currentColor"/>
          <circle cx="0" cy="10" r="5" fill="var(--background, #fff)"/>
          {/* Connecting rod body */}
          <path d="M 0,2 L 35,5 L 35,15 L 0,18 Z" fill="currentColor"/>
          <circle cx="35" cy="10" r="10" fill="currentColor"/>
          {/* Piston Body */}
          <path d="M 45,-15 L 75,-15 L 75,35 L 45,35 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
          {/* Piston Rings */}
          <line x1="65" y1="-15" x2="65" y2="35" stroke="currentColor" strokeWidth="3"/>
          <line x1="55" y1="-15" x2="55" y2="35" stroke="currentColor" strokeWidth="3"/>
        </g>

        {/* Bottom Arc */}
        <path d="M 620,180 A 180,180 0 0,1 220,180" fill="none" stroke="url(#bottomArcGrad)" strokeWidth="12" strokeLinecap="round"/>
        
        {/* Left side Wrench */}
        <g transform="translate(220, 180)">
          {/* Handle connecting to arc */}
          <path d="M 0,-6 L -35,-6 L -35,6 L 0,6 Z" fill="currentColor"/>
          
          {/* Wrench head (peach color) */}
          <path d="M -35,-12 C -60,-25 -85,-10 -85,0 C -85,10 -60,25 -35,12 Z" fill="none" stroke="#FF9B81" strokeWidth="5" strokeLinejoin="round"/>
          {/* Wrench inner cut */}
          <path d="M -35,-8 C -45,-18 -65,-22 -75,-12 C -80,-5 -80,5 -75,12 C -65,22 -45,18 -35,8" fill="none" stroke="#FF9B81" strokeWidth="5"/>
          <path d="M -75,-12 L -60,-2 L -60,2 L -75,12" fill="none" stroke="#FF9B81" strokeWidth="5" strokeLinejoin="round"/>
        </g>

        {/* Text */}
        <text x="400" y="150" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="76" fill="currentColor" textAnchor="middle" letterSpacing="8">NISSAN</text>
        <text x="400" y="195" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="800" fontSize="28" fill="currentColor" textAnchor="middle" letterSpacing="1">Genuine parts</text>
      </g>
    </svg>
  );
}
