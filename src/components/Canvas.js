import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import LispCodePopup from './LispCodePopup';

function Canvas(props) {
  console.log('Código LISP recibido en Canvas:', props.currentLispCode);

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentLispCode, setCurrentLispCode] = useState('');

  const handlePopupSubmit = (code) => {
    setCurrentLispCode(code);
    setShowPopup(false);
  };

  console.log('Valor actual de currentLispCode:', currentLispCode);

  return (
    <div className="App">
        <LispCodePopup onSubmit={handlePopupSubmit} />
      <ThreeScene lispCode={currentLispCode} /> 
    </div>
  );
};
}

const ThreeScene = ({ lispCode }) => {
  const sceneRef = useRef(null);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    if (!scene){
      const newScene = new THREE.Scene();
      setScene(newScene);
    }
  }, []);

  useEffect(() => {
    if (scene && lispCode) {
      const modifySceneBasedOnLispCode = (code) => {
        const createNode = (x, y, z) => {
          const geometry = new THREE.SphereGeometry(0.1, 8, 8); // Geometría de esfera para el nodo
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde para el nodo
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.set(x, y, z); // Posición del nodo
          scene.add(sphere); // Agregar el nodo a la escena
        };

        const createLine = (x1, y1, z1, x2, y2, z2) => {
          const points = [];
          points.push(new THREE.Vector3(x1, y1, z1)); // Punto inicial de la línea
          points.push(new THREE.Vector3(x2, y2, z2)); // Punto final de la línea
      
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Material rojo para la línea
          const line = new THREE.Line(geometry, material);
          scene.add(line); // Agregar la línea a la escena
        };

        if (code.includes('crear_nodo')) {
          // Parsear el código LISP y extraer información para crear nodos
          // Ejemplo: (crear_nodo 0 0 0)
          // Se debe parsear para obtener coordenadas x, y, z del nodo
          // Luego, llamar a la función createNode con esas coordenadas
          // createNode(coordenada_x, coordenada_y, coordenada_z);
        }

        if (code.includes('crear_linea')) {
          // Parsear el código LISP y extraer información para crear líneas
          // Ejemplo: (crear_linea 0 0 0 1 1 1)
          // Se debe parsear para obtener las coordenadas x, y, z de los puntos inicial y final de la línea
          // Luego, llamar a la función createLine con esas coordenadas
          // createLine(coordenada_x1, coordenada_y1, coordenada_z1, coordenada_x2, coordenada_y2, coordenada_z2);
        }
      };
      modifySceneBasedOnLispCode(lispCode);
    }
  }, [scene, lispCode]);

  useEffect(() => {
    if (scene) {
    console.log('Código LISP recibido:', lispCode);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
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
  }
}, [scene, lispCode]);

  return <div ref={sceneRef} />;
};

export default Canvas;