// App.jsx or App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Home from "./pages/HOme";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CUstomcursor";
import Experience from "./pages/Experience";
import Login from "./pages/Login";
import { useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import TourProvider from "./components/TourProvider";
import BotpressChatLoader from "./components/BotpressChatLoader";
import LiveApplication from "./pages/LiveApplication";

function InnerApp() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(true);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem('introPlayed');

    if (location.pathname === '/' && !alreadyPlayed) {
      setIntroDone(false);
      sessionStorage.setItem('introPlayed', 'true');
    }
  }, [location.pathname]);

  return (
    <div className=" w-full bg-gradient-to-br from-gray-900 to-black relative text-white">
      {/* Outer Blur Border Box - Responsive Padding */}
      <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-10 overflow-auto z-10">
        <div className="w-full h-full rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl overflow-auto">
          
          {/* INTRO SCREEN if not already shown */}
          {!introDone ? (
            <IntroScreen onComplete={() => setIntroDone(true)} />
          ) : (
            <>
              <BotpressChatLoader />
              <TourProvider />
              <CustomCursor />
              <Navbar />

              <div className="px-2 sm:px-4 md:px-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/liveapplication" element={<LiveApplication />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}
