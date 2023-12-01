import Element from './Elemenets';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function ElementsContainer({ gameElements, setGameState, time}) {
  return (
    <div
      style={{
        border: 'red',
        height: '80vh',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {shuffleArray([...gameElements]).map((shape, index) => (
        <Element 
          key={index} shape={shape} setGameState={setGameState} time={time}/>
      ))}
    </div>
  );
}
