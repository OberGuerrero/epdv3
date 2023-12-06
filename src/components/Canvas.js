import React, { useState, useRef, useEffect } from 'react';

const DrawingPanel = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [lineColor, setLineColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawLines = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
      });
    };

    drawLines();
  }, [lines, lineColor, lineWidth]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes([...nodes, { x, y }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedLines = [...lines];
    const lastNode = nodes[nodes.length - 1];
    updatedLines.push({ startX: lastNode.x, startY: lastNode.y, endX: x, endY: y });
    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleColorChange = (color) => {
    setLineColor(color);
  };

  const handleWidthChange = (width) => {
    setLineWidth(width);
  };

  const handleClearCanvas = () => {
    setLines([]);
    setNodes([]);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial canvas size on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
      <canvas
        ref={canvasRef}
        style={{ flex: 1, border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default DrawingPanel;
