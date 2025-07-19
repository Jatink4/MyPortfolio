import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InteractiveVideo from "../components/InfiniteInfoCards";
import SkillStrip from "../components/SkillStrip";
import Wave from "react-wavify";
import TalkingAvatar from "../components/TalkingAvatar";
import MusicPlayer from "../components/SongPlayer";


export default function HeroSection() {
  const MotionLink = motion.create(Link);

  return (
    <div className="h-full text-white     overflow-hidden">
      <MusicPlayer  />
         <TalkingAvatar />
        <Wave
        fill="#00aaff"
        paused={false}
        options={{
          height: 50,
          amplitude: 30,
          speed: 0.2,
          points: 3,
        }}
        className="absolute  bottom-0 w-full -z-10"
        style={{ height: "30%" }}
      />
    <div className="h-[80%] pt-30 flex flex-col md:flex-row items-center justify-center text-white  gap-16  relative overflow-hidden px-8">

      {/* LEFT: BIG TEXT */}
      <div className="text-left max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className=" text-[10px] sm:text-[20px] md:text-[30px] font-extrabold leading-tight text-transparent bg-clip-text bg-white"
        >
          Hi, I’m{" "}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" text-[10px] sm:text-[20px] md:text-[30px] font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-600 transition-all hover:scale-110 duration-500"
        >
          <div className="text-[20px] sm:text-[40px] md:text-[60px] hover:text-blue-400 transition duration-300 drop-shadow-[0_5px_5px_rgba(0,0,255,0.4)]">
            Jatin Kumar
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-xl text-blue-200"
        >
          I build immersive 3D web experiences and visually stunning interfaces to bring ideas to life.
        </motion.p>

        <motion.a
          href="/MyResume.pdf"
          download
          whileHover={{
            scale: 1.08,
            backgroundColor: "#3b82f6",
            color: "#fff",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-8 px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg transition-all"
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
  className="inline-block mt-8 ml-5 px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg transition-all"
>
  Contact Me
</MotionLink>
      </div>

      {/* RIGHT: VIDEO or 3D Section */}
      <div className="w-full md:w-1/2" >
        <InteractiveVideo/>
      </div>
      
    </div>
    <div className="px-8">
    <SkillStrip/>
    </div>
    </div>
  );
}