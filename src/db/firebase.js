import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVVjXyehHsuC-yWlXiuTdUWWIfmHHzDew",
  authDomain: "bookingth-9799.firebaseapp.com",
  projectId: "bookingth-9799",
  storageBucket: "bookingth-9799.appspot.com",
  messagingSenderId: "701274382348",
  appId: "1:701274382348:web:13c36e5c05a3498fc9ce29",
  measurementId: "G-45CE57DP1M",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth()

export default {
  db,
  auth,
  firebase,
};
