/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function Timer({ setGameState, setTime, gameState, createShapes }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (gameState !== 'Continue') {
      setIsActive(false), setTime(seconds);
    }
    if (isActive && seconds < 20) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (seconds === 20) {
      setIsActive(false);
      setGameState('Over');
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = async () => {
    await createShapes();
    setSeconds(0);
    setIsActive(true);
    setGameState('Continue');
  };
  return (
    <div>
      {gameState !== 'Continue' && (
        <button onClick={startTimer} disabled={isActive}>
          Start
        </button>
      )}
      {(seconds !== 0 || gameState === 'Continue') && (
        <h1>{seconds} Seconds</h1>
      )}
    </div>
  );
}

export default Timer;
