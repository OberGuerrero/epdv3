import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LispCodePopup = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.trim() === '') {
      setError('El código no puede estar vacío');
      return;
    }

    try {
      const tokens = tokenize(code);
      onSubmit(tokens);
      navigate('/canvas');
    } catch (err) {
      setError('Hubo un error al procesar el código');
      console.error(err);
    }
  };

  const tokenize = (code) => {
    const regex = /\(|\)|"(?:\\.|[^"\\])*"|;.*|[^()\s]+/g;
    return code.match(regex);
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