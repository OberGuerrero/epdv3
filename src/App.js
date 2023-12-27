import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Canvas from './components/Canvas';
import './App.css';
import LispCodePopup from './components/LispCodePopup';

function App() {
  const [currentLispCode, setCurrentLispCode] = useState('');

  const handlePopupSubmit = (code) => {
    setCurrentLispCode(code);
    console.log('Código LISP recibido:', code)
  };

  return (
    <div className="app">
      <Routes>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/lisp' element = {<LispCodePopup onSubmit={handlePopupSubmit} />}/>
          <Route path='/canvas/*' element={<Canvas currentLispCode={currentLispCode} />}/>
      </Routes>
    </div>
  );
}

export default App;
