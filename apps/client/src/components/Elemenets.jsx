/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Element = ({ shape ,setGameState,time}) => {
  useEffect(() => {
    console.log(shape.shape);
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [color, setColor] = useState(shape.color);

  const handleCircleClick = async () => {
  
  try {
    const response = await ffetch('/api/getGameElements');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setGameElements(data);
  } catch (error) {
    console.error('Error during the GET request:', error);
  }
    setIsClicked(!isClicked);
    try {
      const response = await fetch('http://localhost:3000/api/status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.text();
      setGameState(data); // Make sure setGameState can handle a string
      console.log('Status data:', data);
    
      // Perform any additional actions based on the response data
    
    } catch (error) {
      console.error('Error during the GET request:', error);
    }
    try {
      const response = await fetch(`http://localhost:3000/api/click/${shape.index}`
      , {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error during the POST request:', error);
    }
  };

  const ElementStyles = {
    
    width: shape.shape === 'rectangle' ? '4vw' : '6vw',
    height: '6vw',
    borderRadius: shape.shape === 'circle' ? '50%' : '10%', // Makes it a circle
    backgroundColor: shape.color, // Change color when clicked
    cursor: 'pointer',
    marginTop: `${shape.verticalPosition * 80 - 40}vh`,
  };
  return (
    <div>
      <div style={ElementStyles} onClick={handleCircleClick}></div>
    </div>
  );
};

export default Element;
