import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export const ScratchToRevealDate = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2; // High DPI resolution
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      // Draw metallic gold foil layer
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#B8860B');
      grad.addColorStop(0.25, '#F5E096');
      grad.addColorStop(0.5, '#D4AF37');
      grad.addColorStop(0.75, '#8B6508');
      grad.addColorStop(1, '#F5E096');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add noise / paper speckles pattern onto gold foil
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
        ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 2, 2);
      }

      // Scratch Prompt Text on top of gold foil
      ctx.font = '600 13px Montserrat, sans-serif';
      ctx.fillStyle = '#1C1917';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText('✨ SWIPE OR SCRATCH TO REVEAL DATE ✨', rect.width / 2, rect.height / 2);
    };

    setupCanvas();

    const calculateScratchArea = () => {
      if (isRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const imageData = ctx.getImageData(0, 0, rect.width * 2, rect.height * 2);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalSampledPixels = pixels.length / 16;
      const percentScratched = Math.round((transparentPixels / totalSampledPixels) * 100);
      setScratchProgress(percentScratched);

      if (percentScratched >= 40 && !isRevealed) {
        setIsRevealed(true);
        // Clear remaining canvas completely
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Golden Confetti Burst
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F5E096', '#FFF8DC', '#AA771C']
        });
      }
    };

    const getTouchPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (pos) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();
      calculateScratchArea();
    };

    const handleMouseDown = (e) => {
      isDrawingRef.current = true;
      scratch(getTouchPos(e));
    };

    const handleMouseMove = (e) => {
      if (!isDrawingRef.current) return;
      scratch(getTouchPos(e));
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleMouseDown, { passive: true });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [isRevealed]);

  return (
    <div className="my-8 w-full max-w-md mx-auto px-2">
      <div className="text-center mb-3">
        <span className="font-sans-luxury text-[11px] uppercase tracking-[0.25em] text-[#8B6508] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-[#D4AF37]" /> Interactive Reveal <Sparkles size={13} className="text-[#D4AF37]" />
        </span>
        <h3 className="font-serif-luxury text-2xl text-[#1C1917] mt-0.5">
          Save The Date
        </h3>
      </div>

      <div ref={containerRef} className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 paper-shadow group">
        
        {/* Revealed Content underneath */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBF9F5] via-[#FFFDF9] to-[#F5EFE0] p-4 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#8B6508] mb-1">
            <Calendar size={20} />
          </div>

          <div className="font-cinzel text-xl sm:text-2xl font-bold gold-foil-text tracking-wide">
            January 10, 2027
          </div>
          <div className="font-serif-luxury text-base text-[#574436] font-medium mt-0.5">
            Sunday • 4:00 PM EST
          </div>
          <div className="font-sans-luxury text-[11px] uppercase tracking-wider text-[#8B6508] mt-1">
            Cathedral Gardens & Grand Ballroom
          </div>

          {isRevealed && (
            <div className="absolute top-2 right-2 text-[#D4AF37] flex items-center gap-1 text-[10px] font-sans-luxury font-semibold uppercase tracking-wider bg-[#F5E096]/30 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={12} /> Revealed
            </div>
          )}
        </div>

        {/* Scratch Canvas Overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-500"
          />
        )}
      </div>

      {!isRevealed && (
        <div className="flex items-center justify-between text-[11px] font-sans-luxury text-[#8B6508]/80 mt-2 px-1">
          <span>Scratch progress: {scratchProgress}%</span>
          <span className="italic font-serif-luxury text-xs text-[#1C1917]">Use finger or mouse to scratch</span>
        </div>
      )}
    </div>
  );
};
