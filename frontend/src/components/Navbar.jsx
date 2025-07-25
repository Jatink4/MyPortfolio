import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react"; // Optional: use icons from lucide-react
import HeroCanvas from "./HeroCanvas";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-1/2 right-0.5 z-101">
        <button
          onClick={() => setOpen(!open)}
          className=" text-white rounded-full  p-2 shadow-lg"
        >
          {open ? <ChevronRight /> : <HeroCanvas />}
        </button>
      </div>

      {/* Animated Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 h-full w-[200px] sm:w-[200px] bg-black  text-white z-100 shadow-lg"
          >
            <ul className="flex flex-col justify-center h-full p-6 gap-4 text-lg sm:text-xl">
              {["Home", "About", "Projects", "Experience","LiveApplication","Contact" ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} onClick={() => setOpen(false)}>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
