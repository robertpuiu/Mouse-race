/* eslint-disable react/prop-types */
import Element from './Elemenets';

export default function ElementsContainer({
  gameElements,
  elementsFetch,
  setGameElements,
  setGameState,
}) {
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
      {gameElements.map((shape, index) => (
        <Element
          key={index}
          shape={shape}
          elementsFetch={elementsFetch}
          setGameElements={setGameElements}
          setGameState={setGameState}
        />
      ))}
    </div>
  );
}
