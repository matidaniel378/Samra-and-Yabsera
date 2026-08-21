import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Send, Sparkles, Navigation } from 'lucide-react';
import { GoldArchFrame, FloralDivider } from './LaceBorders';
import { ScratchToRevealDate } from './ScratchToRevealDate';
import { GoldThreadTimeline } from './GoldThreadTimeline';

export const MainInvitationCard = ({ onOpenRSVP }) => {
  // Wedding Date target: January 10, 2027
  const weddingDate = new Date('2027-01-10T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <GoldArchFrame>
          {/* Top Invitation Header */}
          <div className="text-center pt-6 pb-2">
            <span className="font-sans-luxury text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#8B6508] font-semibold block mb-2">
              Together With Their Families
            </span>
            
            <h1 className="font-script text-5xl sm:text-7xl text-[#1C1917] font-normal leading-tight my-1 drop-shadow-sm">
              Samra <span className="text-[#D4AF37] font-serif-luxury font-light">&</span> Yabsera
            </h1>

            <div className="font-cinzel text-xs tracking-[0.25em] gold-foil-text font-bold uppercase mt-1">
              Invite You To Celebrate Their Union
            </div>
            
            <FloralDivider />
          </div>

          {/* Romantic Quote */}
          <div className="text-center my-4 max-w-md mx-auto px-2">
            <p className="font-serif-luxury italic text-base sm:text-lg text-[#574436] leading-relaxed">
              "Two souls, bound by love and guided by faith, embarking on a lifelong journey of harmony, joy, and devotion."
            </p>
          </div>

          {/* Interactive Scratch Card for Date */}
          <ScratchToRevealDate />

          {/* Countdown Timer */}
          <div className="my-8 text-center bg-[#F6F2E9]/60 rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30">
            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#8B6508] font-semibold block mb-3">
              Counting Down To The Special Day
            </span>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-sm mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FFFDF9] rounded-xl p-2 sm:p-3 border border-[#D4AF37]/30 paper-shadow">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917] block">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-sans-luxury text-[9px] uppercase tracking-wider text-[#8B6508]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Venue & Location Details Card */}
          <div className="my-8 bg-[#FFFDF9] rounded-2xl p-6 border border-[#D4AF37]/40 paper-shadow text-center">
            <div className="w-12 h-12 rounded-full wax-seal flex items-center justify-center text-[#FFF8DC] mx-auto mb-3 border border-[#FFF8DC]">
              <MapPin size={22} />
            </div>

            <h3 className="font-serif-luxury text-2xl font-semibold text-[#1C1917]">
              The Sanctuary & Grand Ballroom
            </h3>
            
            <p className="font-serif-luxury text-base text-[#574436] mt-1">
              Cathedral Gardens • 742 Evergreen Terrace
            </p>
            <p className="font-sans-luxury text-xs text-[#8B6508] mt-0.5 uppercase tracking-wider">
              Addis Ababa / International Pavilion
            </p>

            <a
              href="https://maps.google.com/?q=Cathedral+Gardens"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full border border-[#D4AF37] text-[#8B6508] hover:bg-[#D4AF37]/15 font-sans-luxury text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Navigation size={14} /> Get Driving Directions
            </a>
          </div>

          {/* Interactive Gold Threaded Timeline */}
          <GoldThreadTimeline />

          {/* Bottom Action Section (RSVP Call to Action) */}
          <div className="mt-10 mb-4 text-center">
            <FloralDivider className="mb-6" />
            
            <p className="font-serif-luxury text-base text-[#574436] mb-4">
              We look forward to sharing this unforgettable celebration with you.
            </p>

            <button
              onClick={onOpenRSVP}
              className="w-full max-w-xs mx-auto py-4 rounded-full gold-foil-bg text-[#1C1917] font-sans-luxury font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Send size={16} /> Respond to Invitation (RSVP)
            </button>
          </div>
        </GoldArchFrame>

        {/* Footer Monogram */}
        <div className="text-center my-8 text-[#8B6508]/70">
          <p className="font-cinzel text-xs tracking-widest uppercase">
            Samra & Yabsera • January 10, 2027
          </p>
          <p className="font-serif-luxury italic text-xs mt-1 text-[#574436]">
            Crafted with eternal love
          </p>
        </div>
      </motion.div>
    </div>
  );
};
