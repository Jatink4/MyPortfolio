import React, { useState, useEffect } from "react";

const wordsList = [
  "Apple", "Tiger", "River", "Sun", "Book", 
  "Moon", "Chair", "Sky", "Rock", "Tree"
];

const colors = [
  "bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400",
  "bg-pink-400", "bg-orange-400", "bg-indigo-400", "bg-teal-400", "bg-lime-400"
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function ColorRevealGame() {
  const [cards, setCards] = useState([]);
  const [guess, setGuess] = useState("");
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [turn, setTurn] = useState(1); // 1 or 2
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    const shuffledWords = shuffleArray(wordsList);
    const shuffledColors = shuffleArray(colors);
    const newCards = shuffledWords.map((word, i) => ({
      word,
      color: shuffledColors[i],
      revealed: false
    }));
    setCards(newCards);
    setRevealedIndex(null);
    setGuess("");
  }, [round]);

  const handleCardClick = (i) => {
   if (round > 6 || revealedIndex !== null || cards[i].revealed) return;

    const updatedCards = [...cards];
    updatedCards[i].revealed = true;
    setCards(updatedCards);
    setRevealedIndex(i);

    if (guess.toLowerCase() === updatedCards[i].word.toLowerCase()) {
      setScore((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
    }

    // Wait 1.5 sec then next turn or round
    setTimeout(() => {
     if (round < 6) {
  if (turn === 1) {
    setTurn(2);
  } else {
    setTurn(1);
    setRound(round + 1);
  }
}

      setRevealedIndex(null);
      setGuess("");
    }, 1500);
  };

  const restartGame = () => {
    setScore({ 1: 0, 2: 0 });
    setRound(1);
    setTurn(1);
  };

  return (
  <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 mb-5 text-center">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-400">
    🎯 Word Reveal Game
  </h1>

  <p className="mb-4 text-lg sm:text-xl text-blue-300">
    Round: {round}/6 | Player {turn}'s Turn
  </p>


  {/* Input */}
  <div className="mb-6">
    <select
  value={guess}
  onChange={(e) => setGuess(e.target.value)}
  className="w-64 max-w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
>
  <option value="" disabled>Select your guess</option>
  {wordsList.map((word, i) => (
    <option key={i} value={word}>{word}</option>
  ))}
</select>
  </div>

  {/* Cards Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-6">
    {cards.map((card, i) => (
      <div
        key={i}
        className={`h-20 sm:h-24 md:h-28 flex items-center justify-center text-white font-semibold rounded cursor-pointer transition-all duration-700 ease-out transform ${
  card.revealed ? "bg-gray-800 scale-110 rotate-3" : card.color + " hover:scale-105"
}`}
        onClick={() => handleCardClick(i)}
      >
        {card.revealed ? card.word : "?"}
      </div>
    ))}
  </div>

  {/* Scores */}
  <div className="text-lg sm:text-xl font-semibold text-cyan-400 mb-2">
    Player 1: {score[1]} | Player 2: {score[2]}
  </div>

  {/* Game Over */}
  {round >= 6 && (
    <div className="mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-pink-400">
        🏆 Game Over! Winner:{" "}
        {score[1] === score[2]
          ? "Draw"
          : score[1] > score[2]
          ? "Player 1"
          : "Player 2"}
      </h2>
      <button
        onClick={restartGame}
        className="mt-4 px-5 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
      >
        🔁 Restart
      </button>
    </div>
  )}
</div>
  );
}
