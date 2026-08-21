import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AmbientAudioPlayer = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const synthRef = useRef(null);

  // External royalty-free classical wedding piano track URL
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-piano-112613.mp3";

  // Fallback Web Audio API synthesizer for smooth ambient harp chord loop
  const startSynthAudio = () => {
    try {
      if (synthRef.current) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      
      const playNote = (freq, duration, delay) => {
        setTimeout(() => {
          if (!synthRef.current || ctx.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay * 1000);
      };

      // Gentle romantic arpeggio notes (F major 9 / D minor chords)
      const notes = [349.23, 440.00, 523.25, 659.25, 523.25, 440.00];
      let step = 0;
      
      const interval = setInterval(() => {
        if (!synthRef.current) return;
        playNote(notes[step % notes.length], 2.5, 0);
        step++;
      }, 800);

      synthRef.current = { ctx, interval };
    } catch (e) {
      console.log('Web audio synth fallback notice', e);
    }
  };

  const stopSynthAudio = () => {
    if (synthRef.current) {
      clearInterval(synthRef.current.interval);
      if (synthRef.current.ctx && synthRef.current.ctx.state !== 'closed') {
        synthRef.current.ctx.close();
      }
      synthRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthAudio();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to Web Audio synth if external stream blocked
          startSynthAudio();
          setIsPlaying(true);
        });
      } else {
        startSynthAudio();
        setIsPlaying(true);
      }
    }
    setHasInteracted(true);
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && !hasInteracted) {
      togglePlay();
    }
  }, [autoPlayTrigger]);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onError={() => console.log('Audio file fallback enabled')}
      />

      <button
        onClick={togglePlay}
        aria-label="Toggle background music"
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full glass-gold shadow-lg border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Equalizer Sound Waves (Animated when playing) */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-4 px-1">
            <span className="w-[3px] bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
            <span className="w-[3px] bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite_300ms] h-4" />
            <span className="w-[3px] bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
            <span className="w-[3px] bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite_400ms] h-3.5" />
          </div>
        ) : (
          <div className="w-5 h-5 text-[#8B6508] flex items-center justify-center">
            <VolumeX size={18} />
          </div>
        )}

        <span className="text-xs uppercase tracking-widest font-sans-luxury text-[#1C1917] font-medium hidden sm:inline">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>

        {/* Pulse Ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-[#D4AF37] animate-ping opacity-25 pointer-events-none" />
        )}
      </button>
    </div>
  );
};
