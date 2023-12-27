import React, { useState } from 'react';

const LispCodePopup = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (code.trim() === '') {
      setError('El código no puede estar vacío');
      return;
    }

    try {
      onSubmit(code);
    } catch (err) {
      setError('Hubo un error al procesar el código');
      console.error(err);
    }
  };

  return (
    <div className="popup">
      <div className="popup-container">
      <h2>Ingrese código Visual LISP</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          cols={50}
          placeholder="Ingrese su código aquí"
        />
        <button onClick={handleSubmit}>Enviar código</button>
      </div>
    </div>
  );
};

export default LispCodePopup;