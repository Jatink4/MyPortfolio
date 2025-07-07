import { motion } from "framer-motion";
import EyeFollow from "../components/EyeFollow";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full bg-white/5 border border-gray-800 backdrop-blur-md p-10 rounded-2xl shadow-2xl"
      ><EyeFollow/>
        <motion.h1
          whileHover={{ scale: 1.05, color: "#00FFFF" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-cyan-400"
        >
          About Me
        </motion.h1>
        

        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Hey there! I'm <span className="text-cyan-300 font-semibold">Jatin Kumar</span>, a passionate and curious web developer currently pursuing a <span className="text-yellow-400">Bachelor of Technology in Computer Science and Engineering</span> at <span className="text-blue-400">IIT (ISM) Dhanbad</span>.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Hailing from <span className="text-green-400">Gurugram, Haryana</span>, I've always been fascinated by how things work under the hood—whether it's websites, systems, or algorithms. That curiosity led me to explore both <span className="text-pink-400">frontend and backend web development</span>, along with sharpening my skills in <span className="text-purple-400">C++ programming</span>.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          I love building responsive, real-world applications that not only look good but also solve problems efficiently. Whether it’s crafting smooth UIs using React or solving complex logic in C++, I enjoy every step of the process.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Outside of coding, you’ll probably find me exploring new tech tools, watching tech breakdowns, or diving into open-source contributions to keep learning and improving.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          I'm always up for a new challenge, a great collaboration, or even a geeky conversation over chai. ☕ Let’s build something awesome!
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 text-center"
        >
          <a
            href="/contact"
            className="inline-block px-6 py-3 border border-cyan-400 text-cyan-300 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            Let’s Connect
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
