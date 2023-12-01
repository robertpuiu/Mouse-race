import { useEffect, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import ElementsContainer from './components/ElementsContainer';

function App() {
  const [gameElements, setGameElements] = useState([]);
  const [gameState,setGameState]=useState("Ready");
  const [time, setTime]=useState(0);
  useEffect(() => {
    fetch('/api/getGameElements')
      .then((res) => res.json())
      .then((data) => {
        setGameElements(data);
        console.log(gameElements);
      })
      .catch((error) => console.error('Error:', error));
  }, []);
  return (
    <div>
      <div>{gameState}</div>
      <Timer setGameState={setGameState} setTime={setTime} gameState={gameState}/>
      {gameState==="Over"&&<div>Your Time: {time}`</div>}
      {gameState==="Continue"&&<ElementsContainer gameElements={gameElements} setGameState={setGameState} time={time}/>}
    </div>
  );
}

export default App;
