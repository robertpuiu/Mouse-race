/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Element = ({ shape, elementsFetch, setGameState, gameid }) => {
  const [color, setColor] = useState(shape.color);
  const [isClicked, setIsClicked] = useState(false);
  const [gameStatus, setGameStatus] = useState();
  const [styles, setStyles] = useState({
    width: shape.shape === 'rectangle' ? '4vw' : '6vw',
    height: '6vw',
    borderRadius: shape.shape === 'circle' ? '50%' : '10%',
    backgroundColor: color,
    cursor: 'pointer',
    marginTop: `${shape.verticalPosition * 80 - 40}vh`,
  });

  useEffect(() => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      backgroundColor: isClicked ? 'transparent' : color,
    }));
  }, [color, isClicked]);

  useEffect(() => {
    if (gameStatus !== 'Continue') {
      setStyles({
        width: shape.shape === 'rectangle' ? '4vw' : '6vw',
        height: '6vw',
        borderRadius: shape.shape === 'circle' ? '50%' : '10%',
        backgroundColor: color,
        cursor: 'pointer',
        marginTop: `${shape.verticalPosition * 80 - 40}vh`,
      });
    }
  }, [gameStatus]);

  const changeElement = async (index) => {
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
        changeElement(shape.index).then(() => {
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
      await elementsFetch(gameid);
      await statusFetch();
      setIsClicked(!isClicked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={styles} onClick={handleCircleClick}></div>
    </div>
  );
};

export default Element;
