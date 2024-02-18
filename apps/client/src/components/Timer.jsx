/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function Timer({ setGameState, setTime, gameState, createElements }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (gameState !== 'Continue') {
      setIsActive(false), setTime(seconds);
    }
    if (isActive && seconds < 10) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (seconds === 10) {
      setIsActive(false);
      setGameState('Over');
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = async () => {
    await createElements();
    setSeconds(0);
    setIsActive(true);
    setGameState('Continue');
  };
  return (
    <div>
      <button onClick={startTimer} disabled={isActive}>
        Start
      </button>
      <h1>{seconds} Seconds</h1>
    </div>
  );
}

export default Timer;
