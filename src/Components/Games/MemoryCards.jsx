import { useState, useEffect } from "react";
import "./MemoryCards.css"; // Assuming you have a CSS file for styling

const symbols = [
  "bicycle",
  "bicycle",
  "leaf",
  "leaf",
  "cube",
  "cube",
  "anchor",
  "anchor",
  "paper-plane-o",
  "paper-plane-o",
  "bolt",
  "bolt",
  "bomb",
  "bomb",
  "diamond",
  "diamond",
];

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const MemoryCards = () => {
  const [cards, setCards] = useState(shuffleArray([...symbols]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matched, setMatched] = useState([]);
  const [steps, setSteps] = useState(0);

  const resetGame = () => {
    setCards(shuffleArray([...symbols]));
    setSelectedCards([]);
    setMatched([]);
    setSteps(0);
  };

  const onCardClick = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
      setSteps((steps) => steps + 1);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const match = cards[selectedCards[0]] === cards[selectedCards[1]];

      if (match) {
        // Use a temporary variable to hold the new matched state
        const newMatched = [...matched, ...selectedCards];
        setTimeout(() => {
          setMatched(newMatched);
          setSelectedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
    // Ensure that useEffect is triggered only when selectedCards or cards change
  }, [selectedCards, cards]);

  return (
    <div className="memory-game">
      <h3>Memory Cards Game</h3>
      <div className="game-controls">
        <button onClick={resetGame}>Reset Game</button>
        <p>Steps: {steps}</p>
      </div>
      <div className="game-board">
        {cards.map((symbol, index) => (
          <div
            key={index}
            className={`card ${
              selectedCards.includes(index) || matched.includes(index)
                ? "selected"
                : ""
            }`}
            onClick={() => onCardClick(index)}
          >
            {(selectedCards.includes(index) || matched.includes(index)) && (
              <i className={`fa fa-${symbol}`}></i>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCards;
