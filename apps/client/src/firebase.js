// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBm8-9AZsLz0FMXuuDxW31vuY72CKFCudI',

  authDomain: 'mouse-race-d4f64.firebaseapp.com',

  projectId: 'mouse-race-d4f64',

  storageBucket: 'mouse-race-d4f64.appspot.com',

  messagingSenderId: '697500197783',

  appId: '1:697500197783:web:af5dc07892b58f72a95ad2',
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export default getFirestore();
