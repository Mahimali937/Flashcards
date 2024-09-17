import { useState, useEffect } from 'react';
import React from 'react'

const Card = (props) => {
  let questions = {
    "Who has won the most Ballon d'Ors in history?": 'Lionel Messi',
    "Which club has won the most Champions Leagues?": 'Real Madrid',
    "Who is the most expensive goalkeeper of all-time?": 'Kepa Arrizabalaga',
    "Which two clubs have won the sextuple?": 'Bayern Munich and Barcelona',
    "Who scored the \"Hand of God\" goal?" : 'Diego Maradona',
    "Who is the youngest La Liga goalscorer currently?": 'Lamine Yamal',
    "Who is the all time top World Cup scorer?": 'Miroslav Klose',
    "How many World Cups have there been in history?": '22',
    "Which clubs has Pep Guardiola managed?": 'Manchester City, Barcelona, and Bayern Munich',
    "What is the record for most goals scored in a calendar year?": '91',
  };
  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    const shuffledKeys = Object.keys(questions).sort(
      () => Math.random() - 0.5
    );
    return Object.fromEntries(
      shuffledKeys.map((key) => [key, questions[key]])
    );
  });

  const [history, setHistory] = useState([Object.keys(shuffledQuestions)[0]]);

  function addHistory(element) {
    setHistory([...history, element]);
  }

  const [seen, setSeen] = useState(false);
  const [index, setIndex] = useState(0);
  const [begun, begin] = useState(false);
  const [display, changeDisplay] = useState(
    Object.keys(shuffledQuestions)[index]
  );
  const [guess, setGuess] = useState('');

  useEffect(() => {
    changeDisplay(Object.keys(shuffledQuestions)[index]);
  }, [index, shuffledQuestions]);

  const beginGame = () => {
    if (!begun) {
      return (
        <div className='card'>
          <button
            className='begin-btn'
            onClick={() => begin(true)}>
            Begin
          </button>
        </div>
      );
    } else {
      return (
        <div className='game'>
          <div
            className='card'
            onClick={() => {
              changeDisplay(
                display === Object.keys(shuffledQuestions)[index]
                  ? shuffledQuestions[Object.keys(shuffledQuestions)[index]]
                  : Object.keys(shuffledQuestions)[index]
              );
              setSeen(true);
            }}>
            <p>{display}</p>
          </div>
          {index > 0 && (
            <button
              className='back-btn'
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                  changeDisplay(Object.keys(shuffledQuestions)[index]);
                }
              }}>
              Back
            </button>
          )}

          {index < Object.keys(shuffledQuestions).length - 1 && (
            <button
              className='next-btn'
              onClick={() => {
                addHistory(Object.keys(shuffledQuestions)[index + 1]);
                setIndex(index + 1);
                setSeen(false);
              }}>
              Next
            </button>
          )}
          {seen === false && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  guess ===
                  shuffledQuestions[Object.keys(shuffledQuestions)[index]]
                ) {
                  alert('Correct!');
                } else {
                  alert('Incorrect. Try again.');
                }
                setGuess('');
              }}>
              <input
                className='input'
                type='text'
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          )}
        </div>
      );
    }
  };
  return beginGame();
};

export default Card;
