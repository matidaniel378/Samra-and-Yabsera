import React, { useState } from 'react';
import { GrandEntranceEnvelope } from './components/GrandEntranceEnvelope';
import { MainInvitationCard } from './components/MainInvitationCard';
import { AmbientAudioPlayer } from './components/AmbientAudioPlayer';
import { FloatingGoldDust } from './components/FloatingGoldDust';
import { RSVPModal } from './components/RSVPModal';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [triggerAudio, setTriggerAudio] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    setTriggerAudio(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] text-[#1C1917] overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#8B6508]">
      
      {/* Floating Gold Sparkle Canvas Background */}
      <FloatingGoldDust />

      {/* Floating Ambient Music Player */}
      <AmbientAudioPlayer autoPlayTrigger={triggerAudio} />

      {/* Grand Entrance Envelope & Wax Seal */}
      <GrandEntranceEnvelope
        isOpened={isEnvelopeOpened}
        onOpen={handleOpenEnvelope}
      />

      {/* Main Luxury Invitation Card once opened */}
      {isEnvelopeOpened && (
        <main className="relative z-10 min-h-screen pb-16">
          <MainInvitationCard onOpenRSVP={() => setIsRSVPOpen(true)} />
        </main>
      )}

      {/* Interactive RSVP Response Modal */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
      />
    </div>
  );
}
