/* eslint-disable react/prop-types */
import Shape from './Shape';

export default function ShapesContainer({
  gameShapes,
  shapesFetch,
  setGameState,
  gameid,
}) {
  return (
    <div
      style={{
        border: 'red',
        height: '80vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {gameShapes.map((shape, index) => (
        <Shape
          key={index}
          shape={shape}
          shapesFetch={shapesFetch}
          setGameState={setGameState}
          gameid={gameid}
        />
      ))}
    </div>
  );
}
