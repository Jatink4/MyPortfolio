// components/SkillStrip.jsx
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Import skill icons from react-icons
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiCloudinary,
  SiFirebase,
  SiCplusplus,
  SiCanva,
  SiStripe,
  SiFramer,
  SiAdobepremierepro,
} from "react-icons/si";

const skills = [
  { name: "MongoDB", icon: <SiMongodb size={40} color="#10aa50" /> },
  { name: "Express", icon: <SiExpress size={40} color="#fff" /> },
  { name: "React", icon: <SiReact size={40} color="#61dafb" /> },
  { name: "Node.js", icon: <SiNodedotjs size={40} color="#8cc84b" /> },
  { name: "Cloudinary", icon: <SiCloudinary size={40} color="#3448c5" /> },
  { name: "Firebase", icon: <SiFirebase size={40} color="#ffca28" /> },
  { name: "C++", icon: <SiCplusplus size={40} color="#00599C" /> },
  { name: "Canva", icon: <SiCanva size={40} color="#00c4cc" /> },
  { name: "Stripe", icon: <SiStripe size={40} color="#635bff" /> },
  { name: "Framer ", icon: <SiFramer size={40} color="#ffffff" /> },
  { name: "Premiere ", icon: <SiAdobepremierepro size={40} color="#9999ff" /> },
];

export default function SkillStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    let x = 0;
    let frameId;

    const animate = () => {
      x -= 2;
      el.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) > el.scrollWidth / 2) x = 0;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative overflow-hidden mt-2 p-5 ">
      <div
        className="flex w-max gap-12 px-8"
        ref={stripRef}
      >
        {[...skills, ...skills].map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.2 }}
            className="w-20 flex flex-col items-center bg-black pt-5 rounded-lg group cursor-pointer"
          >
            {skill.icon}
            
            

  {/* NAME only visible on hover */}
  <div className="text-white text-sm  opacity-0 group-hover:opacity-100 transition duration-300">
    {skill.name}
  </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}