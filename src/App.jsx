import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx';

function App() {
  return (
    <div className='App'>
    <div className='top'>
      <h1 className='title'>Learn Soccer Flashcards!</h1>
      <p className='description'>
        Test Your Soccer Knowledge With These Interactive Flashcards:
      </p>
      <p className='card-count'>10 Cards</p>
    </div>
    <Card />
  </div>
  );
}

export default App;