/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Element = ({ shape }) => {
  useEffect(() => {
    console.log(shape.shape);
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [color, setColor] = useState(shape.color);

  const handleCircleClick = () => {
    setIsClicked(!isClicked);
  };

  const ElementStyles = {
    width: shape.shape === 'rectangle' ? '4vw' : '6vw',
    height: '6vw',
    borderRadius: shape.shape === 'circle' ? '50%' : 'none', // Makes it a circle
    backgroundColor: color, // Change color when clicked
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
