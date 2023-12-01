import Element from './Elemenets';

export default function ElementsContainer({ gameElements }) {
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
        <Element key={index} shape={shape} />
      ))}
    </div>
  );
}
