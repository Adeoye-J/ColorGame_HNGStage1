import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function ColorGuess() {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(null);

  useEffect(() => {
    generateOptions();
  }, [targetColor]);

  const generateOptions = () => {
    let colors = new Set([targetColor]);
    while (colors.size < 6) {
      colors.add(getRandomColor());
    }
    setOptions([...colors].sort(() => Math.random() - 0.5));
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct!");
      setScore(score + 1);
      setShowAnimation("correct");
      setTimeout(() => {
        setShowAnimation(null);
        resetRound();
      }, 1000);
    } else {
      setMessage("Wrong! Try again.");
      setShowAnimation("wrong");
      setTimeout(() => {
        setShowAnimation(null);
        resetRound();
      }, 1000);
    }
  };

  const resetRound = () => {
    setTargetColor(getRandomColor());
    setMessage("Guess the correct color!");
  };

  const resetGame = () => {
    setScore(0);
    resetRound();
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 relative">
      <h1 className="text-xl font-bold">Color Guessing Game</h1>
      <div
        data-testid="colorBox"
        className="w-32 h-32 rounded-md border"
        style={{ backgroundColor: targetColor }}
      ></div>
      <p data-testid="gameInstructions" className="text-lg">
        {message}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="w-16 h-16 rounded-md border hover:opacity-80"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="score" className="text-lg font-semibold">
        Score: {score}
      </p>
      <button
        data-testid="newGameButton"
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        New Game
      </button>
      {showAnimation === "correct" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-green-500 text-4xl font-bold"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 2 }}
        >
          🎉 Correct! 🎉
        </motion.div>
      )}
      {showAnimation === "wrong" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-red-500 text-4xl font-bold"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 2 }}
        >
          ❌ Wrong! ❌
        </motion.div>
      )}
    </div>
  );
}
