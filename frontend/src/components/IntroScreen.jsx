import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onComplete }) {
  const [show, setShow] = useState(true);
  const [glitch, setGlitch] = useState(false);

  const bgRef = useRef(null);
  const glitchRef = useRef(null);

  useEffect(() => {
    // Preload audio elements
    bgRef.current = new Audio('/riser.mp3');
    glitchRef.current = new Audio('/glitch.mp3');

    bgRef.current.volume = 0.5;
    glitchRef.current.volume = 1;

    // Start immediately
    bgRef.current.play().catch((e) => console.warn("Riser play blocked:", e));

    const glitchTimer = setTimeout(() => {
      glitchRef.current.play().catch((e) => console.warn("Glitch play blocked:", e));
      setGlitch(true);
    }, 1000); // glitch after 0.5s

    const exitTimer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(exitTimer);
      bgRef.current?.pause();
      glitchRef.current?.pause();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center text-center px-6 transition-all duration-300 ${
            glitch ? 'glitch-bg broken-glass' : 'bg-black'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className={`text-5xl text-blue-400 md:text-7xl font-extrabold font-mono tracking-widest drop-shadow-[0 0 10px rgba(144, 238, 144, 0.9)] ${
              glitch ? 'glitch-text' : ''
            }`}
          >
            WELCOME<br />TO JATIN'S WORLD
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
