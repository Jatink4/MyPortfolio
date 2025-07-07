import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TalkingAvatar() {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const introText = `Hi! I'm Jatin Kumar, a passionate and curious web developer currently pursuing a Bachelor of Technology in Computer Science and Engineering at IIT Dhanbad. I am from Gurugram, Haryana. I'm always up for a new challenge, a great collaboration, or even a geeky conversation over chai. Let's build something awesome!`;

  // Load and set male voice
  const getMaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    return (
      voices.find(v => /male/i.test(v.name) || /male/i.test(v.voiceURI)) || voices[0]
    );
  };

  const speak = () => {
    if (!speaking) {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(introText);
        utterance.voice = getMaleVoice();
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => {
          setSpeaking(false);
          utteranceRef.current = null;
        };
        utteranceRef.current = utterance;
        speechSynthesis.cancel(); // Cancel previous speech
        speechSynthesis.speak(utterance);
      }
    } else {
      // Stop speaking if clicked again
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  // Ensure voices are loaded before setting one
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  return (
    <div className="fixed top-8 right-8 z-50" data-tour="talking-avatar">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 
                   flex items-center justify-center shadow-xl cursor-pointer"
        onClick={speak}
      >
        <img
          src="/avatar.png"
          alt="Talking Avatar"
          className="w-auto h-full object-cover p-1 rounded-full"
        />
      </motion.div>

      {speaking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -30 }}
          exit={{ opacity: 0 }}
          className="absolute right-20 top-1/2 bg-white text-black px-3 py-1 rounded shadow-md text-sm"
        >
          🎙️ Talking...
        </motion.div>
      )}
    </div>
  );
}
