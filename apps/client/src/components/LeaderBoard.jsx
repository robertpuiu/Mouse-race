import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase';
export default function LeaderBoard() {
  const [races, setRaces] = useState([]);

  const leaderboardStyle = {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const listItemStyle = {
    listStyleType: 'none',
    padding: '20px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#000',
  };

  useEffect(() => {
    onSnapshot(collection(db, 'races'), (snapshot) => {
      const racesFromDB = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setRaces([...racesFromDB].sort((a, b) => a.time - b.time).slice(0, 3));
    });
  }, []);
  return (
    <div style={leaderboardStyle}>
  <h2 style={titleStyle}>Leaderboard</h2>
  <ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>
    <li style={titleStyle}>Place - Name - Time</li>
    {races.map((race, index) => (
      <li key={race.id} style={listItemStyle}>
        <span>{index + 1}</span><span>-</span><span>{race.name}</span><span>-</span><span>{race.time}s</span>
      </li>
    ))}
  </ul>
</div>
  );
}
