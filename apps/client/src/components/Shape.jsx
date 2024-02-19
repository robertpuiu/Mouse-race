/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const Shape = ({ shape, shapesFetch, setGameState, gameid }) => {
  const [color, setColor] = useState(shape.color);
  const [isClicked, setIsClicked] = useState(false);
  const [gameStatus, setGameStatus] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [styles, setStyles] = useState({
    width: shape.shape === 'rectangle' ? '6vw' : '10vw',
    height: '10vw',
    borderRadius: shape.shape === 'circle' ? '50%' : '10%',
    backgroundColor: color,
    cursor: 'pointer',
    boxShadow:
      'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shapeVariants = {
    appear: {
      opacity: [0, 1],
      scale: [0.5, 1],
      transition: { duration: 2 },
    },
    goUpAndDown: {
      y: ['-25vh', '25vh', '-25vh'],
      transition: {
        duration: Math.random() * 7 + 5 - window.innerWidth / 800,
        repeat: Infinity,
      },
    },
  };

  useEffect(() => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      backgroundColor: isClicked ? 'transparent' : color,
      cursor: 'default',
      boxShadow: isClicked ? 'none' : prevStyles.boxShadow,
    }));
  }, [color, isClicked]);
  useEffect(() => {
    if (gameStatus !== 'Continue') {
      setStyles({
        width: shape.shape === 'rectangle' ? '6vw' : '10vw',
        height: '10vw',
        borderRadius: shape.shape === 'circle' ? '50%' : '10%',
        backgroundColor: color,
        cursor: 'pointer',
        boxShadow:
          'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      });
    }
  }, [gameStatus]);

  const changeShape = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/change/${gameid}/${index}`,
        {
          method: 'POST',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the POST request:', error);
    }
  };
  useEffect(() => {
    let timeoutId;

    if (shape.index > 5 && !isClicked) {
      const performAction = () => {
        changeShape(shape.index).then(() => {
          setColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));
        });

        scheduleAction();
      };
      const scheduleAction = () => {
        const delay = Math.floor(Math.random() * 1000) + 2500;
        timeoutId = setTimeout(performAction, delay);
      };
      scheduleAction();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [gameStatus]);

  const clickFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/click/${gameid}/${shape.index}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the POST request:', error);
    }
  };
  const statusFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/status/${gameid}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      setGameStatus(data);
      setGameState(data);
    } catch (error) {
      console.error('Error during the GET request:', error);
    }
  };

  const handleCircleClick = async () => {
    try {
      await clickFetch();
      await shapesFetch(gameid);
      await statusFetch();
      setIsClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      variants={shapeVariants}
      initial="appear"
      animate={isVisible ? 'goUpAndDown' : 'appear'}
    >
      <div style={styles} onClick={isClicked ? null : handleCircleClick}></div>
    </motion.div>
  );
};

export default Shape;
