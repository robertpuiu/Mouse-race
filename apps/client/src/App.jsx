import { useEffect, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import ElementsContainer from './components/ElementsContainer';

function App() {
  const [gameElements, setGameElements] = useState([]);

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
      <Timer />
      <ElementsContainer gameElements={gameElements} />
    </div>
  );
}

export default App;
