import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2aigSsFBmOy9PZP5laRK5W4rKRMM8Ih0",
  authDomain: "whatsapp-clone-sohaib.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-sohaib.firebaseio.com",
  projectId: "whatsapp-clone-sohaib",
  storageBucket: "whatsapp-clone-sohaib.appspot.com",
  messagingSenderId: "544252355077",
  appId: "1:544252355077:web:86fa6128a73e897c85726c",
  measurementId: "G-KHVNHXPEQF"
};

firebase.initializeApp(creds);
export default firebase;