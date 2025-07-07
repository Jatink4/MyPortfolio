// EyeFollow.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EyeFollow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getOffset = (eyeX, eyeY) => ({
    x: (mouse.x - eyeX) / 25,
    y: (mouse.y - eyeY) / 25,
  });

  return (
    <div className="relative left-80 flex gap-2 mb-10 ">
      {/* Left Eye */}
      <Eye pupilOffset={getOffset(window.innerWidth * 0.4, 100)} />

      {/* Right Eye */}
      <Eye pupilOffset={getOffset(window.innerWidth * 0.45, 100)} />
    </div>
  );
}

function Eye({ pupilOffset }) {
  return (
    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
      <motion.div
        className="w-8 h-8 bg-black rounded-full"
        animate={pupilOffset}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
    </div>
  );
}
