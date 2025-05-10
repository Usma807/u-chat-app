import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAYXRcC38JrHnz9SsEKCtFmTipQOttNur8",
  authDomain: "realtimechat-8ade9.firebaseapp.com",
  databaseURL: "https://realtimechat-8ade9-default-rtdb.firebaseio.com",
  projectId: "realtimechat-8ade9",
  storageBucket: "realtimechat-8ade9.firebasestorage.app",
  messagingSenderId: "776511185669",
  appId: "1:776511185669:web:17d4ab68e9c369c6b60d6c",
  measurementId: "G-RVDVXQCS11"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;
export default firebase;