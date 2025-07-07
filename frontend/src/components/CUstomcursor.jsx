import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsDown(true);
    const up = () => setIsDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const size = isDown ? 28 : 18;
  const halo = isDown ? 60 : 45;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      animate={{
        x: pos.x - halo / 2,
        y: pos.y - halo / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.15,
      }}
    >
      {/* Outer Halo */}
      <motion.div
        className="absolute border border-sky-300 mix-blend-difference"
        animate={{
          width: halo,
          height: halo,
          borderRadius: halo,
          opacity: isDown ? 0.4 : 0.25,
          rotate: isDown ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="absolute bg-sky-500 mix-blend-difference"
        animate={{
          width: size,
          height: size,
          borderRadius: size,
          opacity: 1,
          x: (halo - size) / 2,
          y: (halo - size) / 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
