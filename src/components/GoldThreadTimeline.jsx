import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, GlassWater, Music, Sparkles } from 'lucide-react';
import { FloralDivider } from './LaceBorders';

export const GoldThreadTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(null);

  const timelineEvents = [
    {
      id: 1,
      time: "03:30 PM",
      title: "Guest Arrival & Welcome Cocktails",
      location: "Courtyard Terrace",
      icon: GlassWater,
      description: "Sip artisan champagne and enjoy light piano melodies as guests gather in the sunlit garden terrace."
    },
    {
      id: 2,
      time: "04:30 PM",
      title: "The Holy Matrimony & Vows",
      location: "Cathedral Sanctuary",
      icon: Heart,
      description: "Samra and Yabsera exchange lifelong sacred vows in an intimate candlelight ceremony surrounded by loved ones."
    },
    {
      id: 3,
      time: "06:00 PM",
      title: "Grand Entrance & Banquet",
      location: "Imperial Ballroom",
      icon: Sparkles,
      description: "A gourmet multi-course feast celebrating Ethiopian heritage and international culinary fine dining."
    },
    {
      id: 4,
      time: "08:30 PM",
      title: "First Dance, Cake & Celebration",
      location: "Starlight Dance Floor",
      icon: Music,
      description: "Dance the evening away with live orchestra performances, champagne toasts, and wedding cake cutting."
    }
  ];

  return (
    <div className="my-12 w-full max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-sans-luxury text-[11px] uppercase tracking-[0.3em] text-[#8B6508] font-semibold">
          Order of Events
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1917] mt-1">
          Wedding Day Schedule
        </h2>
        <FloralDivider className="my-3" />
      </div>

      {/* Gold Threaded Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D4AF37]/50 space-y-8">
        
        {/* Glowing Gold Thread Line overlay effect */}
        <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#F5E096] to-[#8B6508] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />

        {timelineEvents.map((item, index) => {
          const IconComponent = item.icon;
          const isSelected = activeEvent === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setActiveEvent(isSelected ? null : item.id)}
              className="relative group cursor-pointer"
            >
              {/* Timeline Node Bead on Gold Thread */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full wax-seal border border-[#FFF8DC] flex items-center justify-center text-[#FFF8DC] shadow-md transition-transform duration-300 group-hover:scale-125">
                <IconComponent size={12} />
              </div>

              {/* Event Card Container */}
              <div className={`p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 paper-shadow transition-all duration-300 ${
                isSelected ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-lg' : 'hover:border-[#D4AF37]/60'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8B6508] font-sans-luxury text-xs font-semibold tracking-wider">
                    <Clock size={13} className="text-[#D4AF37]" />
                    {item.time}
                  </div>
                  <span className="text-[10px] font-sans-luxury uppercase tracking-widest text-[#8B6508]/70 bg-[#F5E096]/20 px-2 py-0.5 rounded-full">
                    {item.location}
                  </span>
                </div>

                <h4 className="font-serif-luxury text-xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#8B6508] transition-colors">
                  {item.title}
                </h4>

                <p className="font-serif-luxury text-sm text-[#574436] mt-1.5 leading-relaxed">
                  {item.description}
                </p>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-2.5 border-t border-[#D4AF37]/20 text-xs font-sans-luxury text-[#8B6508] flex items-center gap-1.5"
                  >
                    <Sparkles size={12} /> Special guest dress code: Formal Evening Attire
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
