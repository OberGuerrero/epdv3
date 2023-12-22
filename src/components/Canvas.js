import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import LispCodePopup from './LispCodePopup';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentLispCode, setCurrentLispCode] = useState('');

  const handlePopupSubmit = (code) => {
    setCurrentLispCode(code);
    setShowPopup(false);
  };

  return (
    <div className="App">
      <h1>Tu Aplicación</h1>
      <button onClick={() => setShowPopup(true)}>Ingresar código LISP</button>
      {showPopup && (
        <LispCodePopup onSubmit={handlePopupSubmit} />
      )}
      <ThreeScene lispCode={currentLispCode} />
    </div>
  );
};

const ThreeScene = ({ lispCode }) => {
  const sceneRef = useRef(null);
  useEffect(() => {
    // Crear la escena
    const scene = new THREE.Scene();

    console.log('Código LISP recibido:', lispCode);
    
    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(
      75, // Campo de visión
      window.innerWidth / window.innerHeight, // Proporción de aspecto
      0.1, // Distancia cercana
      1000 // Distancia lejana
    );
    
    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Agregar el renderizador al DOM
    const sceneContainer = sceneRef.current;
    sceneContainer.appendChild(renderer.domElement);
    
    // Actualizar la cámara al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    });
    
    // Actualizar la escena
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={sceneRef} />;
};

export default App;