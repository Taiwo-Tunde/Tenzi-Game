import React from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export const TenziApp = () => {
  const [tenzies, setTenzies] = React.useState(false);

  const [dice, setDice] = React.useState(randomArray());

  // This function is written to prevent repeatiton of lines of codes by just calling this function
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  // const randomArray = Array(6).fill().map( () => Math.round( Math.random() * 6))
  // This function generate new random array of objects by calling the function above (generateNewDice)
  function randomArray() {
    var arr = [];
    for (let i = 0; i < 10; i++) arr.push(generateNewDice());

    return arr;
  }

  // this function is used to confirm if isheld is true, if its true, it wont roll the die with id that is held
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld
            }
          : die;
      })
    );
  }

  // mapping over the dice array to display it and tap into the object keys and value
  const diceToDisplay = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      handleHold={() => holdDice(die.id)}
    />
  ));

  // this code handle the roll and reset of the game after winning
  function handleRoll() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(randomArray());
    }
  }

  // this is to confirm if the numbers are all the same, if they all the same then the play has won else the hasnt
  //  its also check if they are all head in state
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div>
      {/* to conditionally render confetti */}
      {tenzies && <Confetti />}

      <main className="TenziApp-main">
        <div>lets play a game</div>
        <div className="die-container">{diceToDisplay}</div>

        <button onClick={handleRoll} className="btn">
          {" "}
          {tenzies === true ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
};
