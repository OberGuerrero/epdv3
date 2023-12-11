import React from 'react';

const Toolbar = ({
  handleColorChange,
  handleWidthChange,
  handleClearCanvas
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <button onClick={() => handleColorChange('black')}>Black</button>
        <button onClick={() => handleColorChange('red')}>Red</button>
      </div>
      <div>
        <button onClick={() => handleWidthChange(2)}>Thin</button>
        <button onClick={() => handleWidthChange(5)}>Medium</button>
        <button onClick={() => handleWidthChange(8)}>Thick</button>
      </div>
      <div>
        <button onClick={handleClearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default Toolbar;


