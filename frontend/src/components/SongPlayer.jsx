import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { motion } from 'framer-motion';

const songs = [
  {
    id: 1,
    title: "Doremon",
    src: "/songs/Doraemon.mp3",
  },
  {
    id: 2,
    title: "Ben 10",
    src: "/songs/BEN10.mp3",
  },{
    id: 3,
    title: "Shinchan",
    src: "/songs/Shin-Chan.mp3",
  },{
    id: 4,
    title: "Ninja Hattori",
    src: "/songs/Ninja-Hattori.mp3",
  },{
    id: 5,
    title: "Mickey Mouse",
    src: "/songs/Mickey_Mouse.mp3",
  },
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0.5;
    if (playing) {
      audioRef.current.play();
    }
  }
}, [currentIndex]);




  const playPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const nextSong = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setPlaying(true);
  };

  const prevSong = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setPlaying(true);
  };

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 text-center space-y-4 z-50" data-tour="music-player">
      <motion.h2
        className="text-lg font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {songs[currentIndex].title}
      </motion.h2>

      <div className="flex items-center justify-center gap-6 text-xl">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={prevSong}
          className="text-gray-700 hover:text-green-500"
        >
          <FaBackward />
        </motion.button>

        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={playPause}
          className="text-green-600 border border-green-500 p-2 rounded-full hover:bg-green-100"
        >
          {playing ? <FaPause /> : <FaPlay />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={nextSong}
          className="text-gray-700 hover:text-green-500"
        >
          <FaForward />
        </motion.button>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentIndex].src}
        onEnded={nextSong}
      />
    </div>
  );
};

export default MusicPlayer;
