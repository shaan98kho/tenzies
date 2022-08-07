import React from "react"
import './App.css';
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  /*
  * TODO in the future
  * CSS: put real dots on the die face
  * track number of rolls
  * track the time it took to win
  * save best time to localStorage
  */ 

  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(allNewDice())


  React.useEffect(() => {
    if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let dieNumbers = []

    for (var i = 0; i < 10; i++) {
      dieNumbers.push(generateNewDie())
    }

    return dieNumbers
  }


  const diceElements = dice.map((die) => {
    return <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDie={holdDie} />
  })


  function rollDice() {
    setDice(prevDice => {
      if (tenzies) {
        setTenzies(false)
        return allNewDice()
      } else {
        return prevDice.map((die) => {
          return die.isHeld ?
                 die :
                 generateNewDie()
        })
      }
    })
  }



  function holdDie(id) {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }


  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die__container'>
        {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        {diceElements}
      </div>

      <div className="die-btn" onClick={rollDice}>
        <h2>{tenzies ? "New Game" : "Roll"}</h2>
      </div>

    </main>
  );
}

export default App;
