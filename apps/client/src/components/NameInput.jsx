/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../styles/NamePopup.css';
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase';
import { v4 as uuidv4 } from 'uuid';
function NamePopup({ time }) {
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(false);
    const id = uuidv4();
    const docRef = doc(db, 'races', id);
    const payload = { name: name, time: time };
    setDoc(docRef, payload);
    setDoc;
  };

  return (
    time && (
      <div>
        {showPopup && (
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <label>
                Enter your name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        {!showPopup && <p>Welcome, {name}!</p>}
      </div>
    )
  );
}

export default NamePopup;
