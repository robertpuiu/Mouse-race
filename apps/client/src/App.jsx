import { useEffect, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import ElementsContainer from './components/ElementsContainer';
import LeaderBoard from './components/LeaderBoard';
import NamePopup from './components/NameInput';

function App() {
  const [gameElements, setGameElements] = useState([]);
  const [gameState, setGameState] = useState('Ready');
  const [time, setTime] = useState(0);
  const createElements = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/start/2000/1000`,
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
  const deleteElements = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/delete`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the DELETE request:', error);
    }
  };
  const elementsFetch = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getGameElements');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGameElements(data);
    } catch (error) {
      console.error('Error during the GET request:', error);
    }
  };
  useEffect(() => {
    if (gameState === 'Over' || gameState === 'Finished') {
      deleteElements()
        .then(() => createElements())
        .then(() => elementsFetch())
        .catch((error) => console.error('An error occurred:', error));
    }
  }, [gameState]);
  useEffect(() => {
    createElements().then(() => elementsFetch());
  }, []);
  const renderGameState = (gameState) => {
    switch (gameState) {
      case 'Continue':
        return 'Click green Blocks!';
      case 'Over':
        return 'Game Over... Try again!';
      case 'Ready':
        return 'Ready!?';
      case 'Finished':
        return 'Good Game!';
      default:
        return ''; // Default case if none of the above
    }
  };
  return (
    <div>
      <div>{renderGameState(gameState)}</div>

      <Timer
        setGameState={setGameState}
        gameState={gameState}
        setTime={setTime}
      />

      {gameState === 'Continue' ? (
        <ElementsContainer
          gameElements={gameElements}
          elementsFetch={elementsFetch}
          setGameElements={setGameElements}
          setGameState={setGameState}
        />
      ) : (
        <>
          {gameState === 'Finished' && <NamePopup time={time} />}
          <LeaderBoard />
        </>
      )}
    </div>
  );
}

export default App;
