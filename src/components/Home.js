import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import Canvas from './Canvas';
import './Home.css';

function Home() {
    return (
      <div className="home">
        <nav className='header-nav'>
          <img src='https://electrimex.com/assets/img/imgIntro.jpg' alt="Encabezado" className="header-image" />
          <h1 className='title'>Plataforma Principal</h1>
        </nav>
        <Link to="/canvas" className='button'>Generar Diseño</Link>
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
