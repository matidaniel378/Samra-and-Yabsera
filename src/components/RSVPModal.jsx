import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, Check, Heart, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RSVPModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    dietary: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#F5E096', '#FFF8DC', '#AA771C']
    });
  };

  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Samra+%26+Yabsera&dates=20270110T210000Z/20270111T030000Z&details=Celebrating+the+wedding+of+Samra+and+Yabsera&location=Cathedral+Gardens";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="relative w-full max-w-md bg-[#FBF9F5] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 paper-shadow-deep my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFEADF] flex items-center justify-center text-[#574436] hover:text-[#1C1917] hover:bg-[#D4AF37]/30 transition-colors"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full wax-seal flex items-center justify-center text-[#FFF8DC] mx-auto mb-4 border border-[#FFF8DC]">
                  <Check size={32} />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#1C1917]">
                  Thank You, {formData.name || 'Dear Guest'}!
                </h3>
                <p className="font-serif-luxury text-base text-[#574436] mt-2 leading-relaxed">
                  Your response has been warmly received. Samra & Yabsera are thrilled to celebrate this memorable day with you!
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full gold-foil-bg text-[#1C1917] font-sans-luxury text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                  >
                    <Calendar size={16} /> Add to Google Calendar
                  </a>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-[#D4AF37] text-[#8B6508] font-sans-luxury text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37]/10"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#8B6508] font-semibold">
                    R.S.V.P.
                  </span>
                  <h3 className="font-serif-luxury text-3xl text-[#1C1917] mt-0.5">
                    Kindly Respond
                  </h3>
                  <p className="font-serif-luxury italic text-xs text-[#574436] mt-1">
                    Please respond by December 10, 2026
                  </p>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-sans-luxury font-medium text-[#1C1917] uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Honorable Guest"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF9] text-[#1C1917] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-sm"
                  />
                </div>

                {/* Attendance Buttons */}
                <div>
                  <label className="block text-xs font-sans-luxury font-medium text-[#1C1917] uppercase tracking-wider mb-1">
                    Attendance
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'yes' })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-sans-luxury uppercase tracking-wider font-semibold transition-all ${
                        formData.attending === 'yes'
                          ? 'bg-[#D4AF37] text-[#1C1917] border-[#D4AF37] shadow-sm'
                          : 'bg-[#FFFDF9] text-[#574436] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'no' })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-sans-luxury uppercase tracking-wider font-semibold transition-all ${
                        formData.attending === 'no'
                          ? 'bg-[#574436] text-[#FFF8DC] border-[#574436] shadow-sm'
                          : 'bg-[#FFFDF9] text-[#574436] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-sans-luxury font-medium text-[#1C1917] uppercase tracking-wider mb-1">
                    Number of Attending Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF9] text-[#1C1917] focus:outline-none focus:border-[#D4AF37] text-sm"
                  >
                    <option value="1">1 Guest (Just me)</option>
                    <option value="2">2 Guests (+1)</option>
                    <option value="3">3 Guests (Family)</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>

                {/* Dietary Requirements */}
                <div>
                  <label className="block text-xs font-sans-luxury font-medium text-[#1C1917] uppercase tracking-wider mb-1">
                    Dietary Requirements / Restrictions
                  </label>
                  <input
                    type="text"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    placeholder="e.g. Vegan, Gluten-Free, Halal, Kosher"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF9] text-[#1C1917] focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>

                {/* Note for Couple */}
                <div>
                  <label className="block text-xs font-sans-luxury font-medium text-[#1C1917] uppercase tracking-wider mb-1">
                    Blessing / Message for Samra & Yabsera
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write a heartfelt note..."
                    className="w-full px-4 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF9] text-[#1C1917] focus:outline-none focus:border-[#D4AF37] text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full gold-foil-bg text-[#1C1917] font-sans-luxury font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={15} /> Confirm RSVP Response
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
