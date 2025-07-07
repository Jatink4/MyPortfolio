import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getProjects } from "../api/project";

const glowPalettes = [
  ["from-purple-500", "to-cyan-500", "border-purple-500"],
  ["from-pink-500",   "to-yellow-500", "border-pink-500"],
  ["from-teal-500",   "to-emerald-500","border-teal-500"],
  ["from-orange-500", "to-red-500",    "border-orange-500"],
];

export function GlowCard({ idx, children }) {
  const ref = useRef(null);
  const [from, to, border] = glowPalettes[idx % glowPalettes.length];

  // 3‑D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [16, -16]);
  const rotateY = useTransform(x, [-60, 60], [-16, 16]);

  const handleMove = (e) => {
    const b = ref.current.getBoundingClientRect();
    x.set(e.clientX - b.left - b.width / 2);
    y.set(e.clientY - b.top - b.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-70 mx-auto"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      {/* neon ring */}
      <div
        className={`absolute -inset-0.5 rounded-xl blur-xl opacity-70
                    bg-gradient-to-br ${from} ${to}`}
      />

      {/* card */}
      <motion.div
        className={`relative z-10 w-full bg-[#111319]/80 backdrop-blur-lg
                   rounded-xl p-2 text-white border ${border}
                   shadow-[0_5px_40px_rgba(0,0,0,0.6)]`}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0); y.set(0);
        }}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 130, damping: 12 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
export function FlipCard({ frontImg, children }) {
  return (
    <div className="group [perspective:1000px] w-full h-96">
      <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute inset-0 bg-gray-800 rounded-xl backface-hidden">
          <img
            src={frontImg}
            alt="Front"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black text-white rounded-xl px-6 py-4 [transform:rotateY(180deg)] backface-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}



export default function OrbitProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data || []));
  }, []);

  useEffect(() => {
    const box = document.getElementById("parallax");
    if (!box) return;

    const parallax = (e) => {
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX;
      const _mouseY = e.clientY;
      const _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
      const _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
      const _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
      box.style.backgroundPosition = `${_depth3}, ${_depth2}, ${_depth1}`;
    };

    window.addEventListener("mousemove", parallax);
    return () => window.removeEventListener("mousemove", parallax);
  }, []);

  



  return (
    <>
      {/* 3‑layer mouse‑move hero */}
      <div
        id="parallax"
        className="relative w-full h-screen  select-none"
        style={{backgroundColor:"linear-gradient(to bottom, #0a0f3c, #1a1a1a, #3c1361)",
          backgroundImage:
            "url(/parallex/depth-3.png),url(/parallex/depth-2.png),url(/parallex/depth-1.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
        }} 
      >
         
        <h1 className="absolute text-sky-500 font-bold font-sans uppercase  text-8xl top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          Projects
        </h1>
      </div>
      <section
      className="min-h-screen w-full py-20  flex flex-col gap-16 items-center
                 text-white relative overflow-hidden"
    >

      

      {/* card grid */}
      <div className="grid gap-20 lg:grid-cols-1 xl:grid-cols-2">
        {projects.map((p, i) => (
  <GlowCard key={i} idx={i}>
    {/* circular thumb */}
    <div className="relative mb-4 w-full h-64">
     <motion.img
  src={p.image}
  alt={p.title}
  className="w-full h-full object-cover  rounded-t-xl"
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
/>
    </div>

    {/* Pop‑out title */}
    <motion.h2
      whileHover={{ scale: 1.2, translateZ: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="text-xl font-bold text-center mb-2 origin-center"
    >
      {p.title}
    </motion.h2>

    <p className="text-sm text-center opacity-80 mb-3">{p.description}</p>

    {/* tech */}
    <div className="flex flex-wrap justify-center gap-2">
      {p.tech?.map((t, j) => (
        <span
          key={j}
          className="bg-white/10 border border-white/20 text-xs px-2 py-1 rounded-md"
        >
          {t}
        </span>
      ))}
    </div>

    {/* links */}
    <div className="flex justify-center gap-6 mt-4 text-sm font-semibold">
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 underline"
        >
          🌐 Live
        </a>
      )}
      {p.githubUrl && (
        <a
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 underline"
        >
          📦 GitHub
        </a>
      )}
    </div>
  </GlowCard>
))}

      </div>
    </section>
    </>
  );
}

