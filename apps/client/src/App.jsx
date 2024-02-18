import { useEffect, useState } from 'react';
import './styles/App.css';
import Timer from './components/Timer';
import ElementsContainer from './components/ElementsContainer';
import LeaderBoard from './components/LeaderBoard';
import NamePopup from './components/NameInput';

function App() {
  const [gameElements, setGameElements] = useState([]);
  const [gameState, setGameState] = useState('Ready');
  const [time, setTime] = useState(0);
  const [gameid, setGameid] = useState('gameid');
  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };
  const createElements = async () => {
    try {
      const newGameid = randomId();
      setGameid(newGameid);
      const response = await fetch(
        `http://127.0.0.1:3000/api/start/${newGameid}/2000/1000`,
        {
          method: 'POST',
        }
      );
      await elementsFetch(newGameid);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the POST request:', error);
    }
  };

  const deleteElements = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/${gameid}/delete`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the DELETE request:', error);
    }
  };
  const elementsFetch = async (newGameid) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getGameElements/${newGameid}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGameElements(data);
    } catch (error) {
      console.error('Error during the GET request:', error);
    }
  };

  const renderGameState = (gameState) => {
    switch (gameState) {
      case 'Over':
        return 'Game Over... Try again!';
      case 'Ready':
        return 'Ready!?';
      case 'Finished':
        return 'Good Game!';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (gameState === 'Over' || gameState === 'Finished') {
      deleteElements();
    }
  }, [gameState]);
  return (
    <div>
      <h1>Mouse racer</h1>
      <h3>Click the green blocks as fast as you can!</h3>
      <div>{renderGameState(gameState)}</div>

      <Timer
        setGameState={setGameState}
        gameState={gameState}
        setTime={setTime}
        createElements={createElements}
      />

      {gameState === 'Continue' ? (
        <ElementsContainer
          gameElements={gameElements}
          elementsFetch={elementsFetch}
          setGameState={setGameState}
          gameid={gameid}
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
