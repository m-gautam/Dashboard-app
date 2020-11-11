import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFtJmRcet7YFpZFakOlmOyK2g4N0PHs-0",
  authDomain: "dashboard-project-294705.firebaseapp.com",
  databaseURL: "https://dashboard-project-294705.firebaseio.com",
  projectId: "dashboard-project-294705",
  storageBucket: "dashboard-project-294705.appspot.com",
  messagingSenderId: "1039172306376",
  appId: "1:1039172306376:web:ad1967375a892c74ae6cfd",
  measurementId: "G-W7X4JJVB1E",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
  analytics.logEvent("login", { provider });
};
