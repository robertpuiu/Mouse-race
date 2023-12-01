import { useState, useEffect } from 'react';

function Timer({setGameState , setTime, gameState}) {
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if(gameState==="Over"){setIsActive(false),setTime(15-seconds)};
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setGameState("Over");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setSeconds(15);
    setIsActive(true);
    setGameState("Continue");
  };

  const resetTimer = () => {
    setTime(seconds);
    setGameState("Ready")
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
