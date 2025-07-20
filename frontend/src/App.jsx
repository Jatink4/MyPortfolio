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
    <div className="bg-gradient-to-br from-gray-900 to-black w-full min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 backdrop-blur-2xl m-10 rounded-4xl bg-white/5 border border-white/10 z-10 overflow-auto bor">
        {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}
        {introDone && (
          <>
          <BotpressChatLoader/>
          <TourProvider />
            <CustomCursor />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/liveapplication" element={<LiveApplication />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </>
        )}
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