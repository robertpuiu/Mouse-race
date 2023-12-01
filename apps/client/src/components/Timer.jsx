import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setSeconds(15);
    setIsActive(true);
  };

  const resetTimer = () => {
    setSeconds(15);
    setIsActive(false);
  };

  return (
    <div>
      <button onClick={startTimer} disabled={isActive}>
        Start
      </button>
      <button onClick={resetTimer}>Reset</button>
      <h1>{seconds} Seconds</h1>
    </div>
  );
}

export default Timer;
