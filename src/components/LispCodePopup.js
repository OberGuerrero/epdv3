import React, { useState } from 'react';

const LispCodePopup = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onSubmit(code);
    setCode('');
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Ingrese el código LISP:</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingrese el código LISP aquí..."
          rows={10}
          cols={50}
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default LispCodePopup;
