import { useState, useEffect } from "react";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default function ColorGame() {
    const [targetColor, setTargetColor] = useState(getRandomColor());
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState("Guess the correct color!");
    const [score, setScore] = useState(0);

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
        } else {
            setMessage("Wrong! Try again.");
        }
    };

    const resetGame = () => {
        setTargetColor(getRandomColor());
        setMessage("Guess the correct color!");
    };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
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
    </div>
  );
}
