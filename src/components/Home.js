import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LispCodePopup from './LispCodePopup';
import './Home.css';

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerateDesignClick = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = (code) => {
    console.log('Código LISP ingresado:', code);
    setShowPopup(false);
  };
    return (
      <div className="home">
        <nav className='header-nav'>
          <img src='https://electrimex.com/assets/img/imgIntro.jpg' alt="Encabezado" className="header-image" />
          <h1 className='title'>Plataforma Principal</h1>
        </nav>
        <Link to="/canvas" className='button' onClick={handleGenerateDesignClick}>Generar Diseño</Link>
        <Link to="/canvas" className='button'>Importar Diseño</Link>
        <div className='container'>
          <hr className='separator'/>
        </div>
        <footer>
          <h2 className='subtitle'>Diseños Agregados Recientemente</h2>
          <Link to="/canvas" className='button'>Agregar Nuevo Diseño</Link>
        </footer>
      </div>
      );

}

export default Home;
