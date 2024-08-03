import { useState, useEffect } from 'react';
import React from 'react'

const Card = (props) => {
  let questions = {
    "Who Has Won the Most Ballon d'Ors in History?": 'Lionel Messi',
    "Which Club Has Won the Most Champions Leagues?": 'Real Madrid',
    "Who Is The Most Expensive Goalkeeper Of All-Time?": 'Kepa Arrizabalaga',
    "Which Two Clubs Have Won The Sextuple?": 'Bayern Munich and Barcelona',
    "Who Scored The Hand of God Goal?" : 'Diego Maradona',
    "Who Is The Youngest La Liga Goalscorer Currently?": 'Lamine Yamal',
    'Who is The All Time Top World Cup Scorer?': 'Miroslav Klose',
    "How many World Cups have there been in history?": '22',
    "Which Clubs Has Pep Guardiola Managed?": 'Manchester City, Barcelona, and Bayern Munich',
    "What Is The Record For Most Goals Scored In A Calendar Year?": '91',
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
