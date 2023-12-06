import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/canvas' element = {<Canvas />}></Route>
      </Routes>
    </div>
  );
}

export default App;
