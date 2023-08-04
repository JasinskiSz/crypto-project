import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgy7Pd-8qwuMW7pmQTPMfPBurUW7vrkh0",
    authDomain: "crypto-project-bbc0e.firebaseapp.com",
    databaseURL: "https://crypto-project-bbc0e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crypto-project-bbc0e",
    storageBucket: "crypto-project-bbc0e.appspot.com",
    messagingSenderId: "487824028930",
    appId: "1:487824028930:web:20e642fc53a9f7a24a7e1b"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();