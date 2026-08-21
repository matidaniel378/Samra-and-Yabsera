import React from 'react';

export const LaceCorner = ({ className = "w-12 h-12 text-[#D4AF37]" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 H95 V15 H15 V95 H5 V5Z" fill="currentColor" opacity="0.3"/>
    <path d="M20 20 H80 V25 H25 V80 H20 V20Z" fill="currentColor" opacity="0.5"/>
    {/* Delicate Floral Lace Scrollwork */}
    <path d="M10 10 C 30 10, 40 25, 40 40 C 25 40, 10 30, 10 10 Z" fill="currentColor" opacity="0.7"/>
    <path d="M15 15 C 35 15, 45 30, 45 45 C 30 45, 15 35, 15 15 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="25" cy="25" r="4" fill="currentColor" />
    <circle cx="35" cy="15" r="2.5" fill="currentColor" />
    <circle cx="15" cy="35" r="2.5" fill="currentColor" />
    <path d="M50 12 C 55 5, 65 5, 70 12 C 75 20, 60 30, 50 30 C 40 30, 25 20, 30 12 C 35 5, 45 5, 50 12 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const GoldArchFrame = ({ children, className = "" }) => (
  <div className={`relative p-6 sm:p-10 rounded-t-[140px] sm:rounded-t-[200px] border-2 border-[#D4AF37]/40 bg-[#FBF9F5] paper-shadow-deep ${className}`}>
    {/* Inner Gold Foil Line */}
    <div className="absolute inset-3 sm:inset-5 rounded-t-[125px] sm:rounded-t-[180px] border border-[#D4AF37]/30 pointer-events-none" />
    
    {/* Delicate Lace Ornaments in Top Arch */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#D4AF37] opacity-80 pointer-events-none">
      <svg width="80" height="30" viewBox="0 0 120 40" fill="none">
        <path d="M10 30 C 30 5, 90 5, 110 30" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 30 C 40 12, 80 12, 100 30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="10" r="4" fill="currentColor" />
        <circle cx="45" cy="16" r="2.5" fill="currentColor" />
        <circle cx="75" cy="16" r="2.5" fill="currentColor" />
      </svg>
    </div>

    {/* Corner Filigrees */}
    <div className="absolute top-3 left-3 pointer-events-none opacity-70">
      <LaceCorner className="w-8 h-8 text-[#D4AF37]" />
    </div>
    <div className="absolute top-3 right-3 pointer-events-none opacity-70 transform scale-x-[-1]">
      <LaceCorner className="w-8 h-8 text-[#D4AF37]" />
    </div>
    <div className="absolute bottom-3 left-3 pointer-events-none opacity-70 transform scale-y-[-1]">
      <LaceCorner className="w-8 h-8 text-[#D4AF37]" />
    </div>
    <div className="absolute bottom-3 right-3 pointer-events-none opacity-70 transform scale-[-1]">
      <LaceCorner className="w-8 h-8 text-[#D4AF37]" />
    </div>

    {children}
  </div>
);

export const FloralDivider = ({ className = "my-6" }) => (
  <div className={`flex items-center justify-center gap-3 text-[#D4AF37] opacity-80 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="#FBF9F5" />
    </svg>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </div>
);
