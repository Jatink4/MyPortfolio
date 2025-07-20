import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InteractiveVideo from "../components/InfiniteInfoCards";
import SkillStrip from "../components/SkillStrip";
import Wave from "react-wavify";
import TalkingAvatar from "../components/TalkingAvatar";
import MusicPlayer from "../components/SongPlayer";
import { useState } from "react";

export default function HeroSection() {
  const MotionLink = motion.create(Link);
  const [isTouchingC, setIsTouchingC] = useState(false);
  const [isTouchingR, setIsTouchingR] = useState(false);

  return (
    <div className="min-h-screen  text-white overflow-hidden relative">
      
      {/* Header: Music + Avatar */}
      <div className="w-full flex flex-col-reverse items-center justify-between px-4 mt-3  md:flex-row md:items-start md:px-8">
        <div className="mt-20 sm:mt:0 md:mt-0">
          <MusicPlayer />
        </div>
        <div className="md:ml-auto">
          <TalkingAvatar />
        </div>
      </div>

      {/* WAVE Background */}
  <Wave
  fill="#00aaff"
  paused={false}
  options={{
    height: 50,
    amplitude: 30,
    speed: 0.2,
    points: 3,
  }}
  className="absolute bottom-0 w-full -z-10 
             h-[200px]"
/>


      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-10 mt-20 mb-10   text-center md:text-left">
        
        {/* LEFT: Text */}
        <div className="max-w-xl pt-10 ">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="text-4xl   font-extrabold bg-clip-text text-transparent bg-white"
          >
            Hi, I’m
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-[50px] md:text-[60px] font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-110 transition-all duration-500"
          >
            Jatin Kumar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-blue-200"
          >
            I build immersive 3D web experiences and visually stunning interfaces to bring ideas to life.
          </motion.p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
          <motion.a
  href="/MyResume.pdf"
  download
  whileHover={{
    scale: 1.08,
    backgroundColor: "#3b82f6",
    color: "#fff",
  }}
  whileTap={{ scale: 0.95 }}
  onTouchStart={() => setIsTouchingR(true)}
        onTouchMove={() => setIsTouchingR(true)}
        onTouchEnd={() => setIsTouchingR(false)}
        className={`px-6 py-3 font-semibold rounded-xl shadow-lg ${
          isTouchingR ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
>
  My Resume
</motion.a>

<MotionLink
  to="/contact"
  whileHover={{
    scale: 1.08,
    backgroundColor: "#3b82f6",
    color: "#fff",
  }}
  whileTap={{ scale: 0.95 }}
  onTouchStart={() => setIsTouchingC(true)}
        onTouchMove={() => setIsTouchingC(true)}
        onTouchEnd={() => setIsTouchingC(false)}
        className={`px-6 py-3 font-semibold rounded-xl shadow-lg ${
          isTouchingC ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
>
  Contact Me
</MotionLink>
          </div>
        </div>

        {/* RIGHT: Video/3D Component */}
        <div className="w-full md:w-1/2">
          <InteractiveVideo />
        </div>
      </div>

      {/* Skill Strip Section */}
      <div className="px-4 md:px-8">
        <SkillStrip />
      </div>
    </div>
  );
}
