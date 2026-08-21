import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const GrandEntranceEnvelope = ({ onOpen, isOpened }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A1816]/80 backdrop-blur-md overflow-hidden"
        >
          {/* Subtle Light Reflection Overlay */}
          <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-black/60 pointer-events-none" />

          {/* Container for Envelope */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] perspective-1000 flex items-center justify-center">

            {/* Main Envelope Body */}
            <motion.div
              className="relative w-full h-full bg-[#F3EFE6] rounded-xl border-2 border-[#D4AF37]/50 paper-shadow-deep flex flex-col justify-between overflow-hidden transform-style-3d"
              animate={isOpening ? { scale: [1, 1.03, 0.95], rotateZ: [0, -1, 1, 0] } : { y: [0, -4, 0] }}
              transition={isOpening ? { duration: 0.8 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {/* Embossed Lace Border Patterns around envelope edge */}
              <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-md" />
                  <div className="w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-md" />
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-md" />
                  <div className="w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-md" />
                </div>
              </div>

              {/* Textured Cream Paper Background Pattern */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Bottom Pocket Flap (V-Shape Overlay) */}
              <div 
                className="absolute bottom-0 inset-x-0 h-1/2 bg-[#EFEADF] border-t border-[#D4AF37]/40 z-10"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)',
                  boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
                }}
              />

              {/* Side Flaps */}
              <div 
                className="absolute inset-y-0 left-0 w-1/2 bg-[#EBE5D8] border-r border-[#D4AF37]/30 z-10"
                style={{
                  clipPath: 'polygon(0% 0%, 80% 50%, 0% 100%)'
                }}
              />
              <div 
                className="absolute inset-y-0 right-0 w-1/2 bg-[#EBE5D8] border-l border-[#D4AF37]/30 z-10"
                style={{
                  clipPath: 'polygon(100% 0%, 20% 50%, 100% 100%)'
                }}
              />

              {/* Top Flap (Peeling 3D Animation) */}
              <motion.div
                className="absolute top-0 inset-x-0 h-1/2 bg-[#F6F2E9] border-b border-[#D4AF37]/50 z-20 origin-top transform-style-3d shadow-md"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 90%)',
                }}
                animate={isOpening ? { rotateX: -180, zIndex: 5 } : { rotateX: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Gold Lace Foil Trimming on Top Flap */}
                <div className="absolute inset-x-0 bottom-2 flex justify-center text-[#D4AF37]/70">
                  <svg width="60" height="15" viewBox="0 0 100 20" fill="none">
                    <path d="M0 0 C 25 15, 75 15, 100 0" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </motion.div>

              {/* Envelope Invitation Preview Peak inside */}
              <motion.div
                className="absolute inset-x-6 top-8 bottom-6 bg-[#FBF9F5] rounded-t-lg z-0 border border-[#D4AF37]/30 shadow-inner p-4 text-center flex flex-col items-center justify-start pt-6"
                animate={isOpening ? { y: -60, scale: 1.02 } : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-sans-luxury">
                  The Wedding Celebration
                </div>
                <div className="font-script text-2xl text-[#1C1917] mt-1">
                  Samra & Yabsera
                </div>
              </motion.div>

              {/* Embossed Glowing Gold Wax Seal Monogram */}
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-auto">
                <motion.button
                  onClick={handleSealClick}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px -5px rgba(212, 175, 55, 0.4)",
                      "0 15px 35px 5px rgba(212, 175, 55, 0.7)",
                      "0 10px 25px -5px rgba(212, 175, 55, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full wax-seal flex items-center justify-center border-2 border-[#F5E096]/60 cursor-pointer group"
                >
                  {/* Wax Seal Rim Ridge Detail */}
                  <div className="absolute inset-1.5 rounded-full border border-[#8B6508]/40 pointer-events-none" />

                  {/* Monogram Stamp Text */}
                  <div className="text-center z-10 transform group-hover:scale-105 transition-transform duration-300">
                    <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#FFF8DC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      S & Y
                    </span>
                    <div className="text-[9px] uppercase tracking-widest text-[#F5E096]/90 font-sans-luxury -mt-0.5">
                      Open
                    </div>
                  </div>

                  {/* Sparkle Icon Badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1C1917] shadow-lg border border-[#FFF8DC]">
                    <Sparkles size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </motion.button>

                {/* Tap Instruction Prompt */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <p className="font-serif-luxury italic text-sm text-[#D4AF37] tracking-wider drop-shadow-sm">
                    Tap seal to open invitation
                  </p>
                  <p className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#EFEADF]/80 mt-0.5">
                    Samra & Yabsera • 2027
                  </p>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
