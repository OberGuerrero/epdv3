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
      <h1>Energy Pole Designer - Lector código LISP</h1>
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
    const scene = new THREE.Scene();

    console.log('Código LISP recibido:', lispCode);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const modifySceneBasedOnLispCode = (code) => {
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    };

    if (lispCode) {
      modifySceneBasedOnLispCode(lispCode);
    }
    
    const sceneContainer = sceneRef.current;
    sceneContainer.appendChild(renderer.domElement);
    
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    });
    
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, [lispCode]);

  return <div ref={sceneRef} />;
};

export default ThreeScene;