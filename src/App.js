import "./App.css";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValues = dice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValues) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElements = dice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="game-title">Tenzies</h1>
      <p className="instruction-text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
