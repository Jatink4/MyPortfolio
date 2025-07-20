// EyeFollow.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EyeFollow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse + Touch tracking
  useEffect(() => {
    const handleMove = (e) => {
      if (e.touches) {
        setMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else {
        setMouse({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  // Adjust eye centers
  const getOffset = (eyeX, eyeY) => ({
    x: (mouse.x - eyeX) / 25,
    y: (mouse.y - eyeY) / 25,
  });

  // Responsive eye positions (centered horizontally)
  const eye1X = window.innerWidth / 2 - 40;
  const eye2X = window.innerWidth / 2 + 40;
  const eyeY = 100;

  return (
    <div className="w-full flex justify-center gap-4 mb-10 mt-10">
      {/* Left Eye */}
      <Eye pupilOffset={getOffset(eye1X, eyeY)} />

      {/* Right Eye */}
      <Eye pupilOffset={getOffset(eye2X, eyeY)} />
    </div>
  );
}

function Eye({ pupilOffset }) {
  return (
    <div className="w-20 h-20 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
      <motion.div
        className="w-8 h-8 sm:w-5 sm:h-5 bg-black rounded-full"
        animate={pupilOffset}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
    </div>
  );
}
