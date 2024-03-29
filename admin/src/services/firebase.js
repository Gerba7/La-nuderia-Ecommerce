import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByGQhsu3O_RMMLlazKB2vNhmbWriqDYtk",
  authDomain: "la-nuderia.firebaseapp.com",
  projectId: "la-nuderia",
  storageBucket: "la-nuderia.appspot.com",
  messagingSenderId: "191382364838",
  appId: "1:191382364838:web:a2b07bb4e904a6b6664a67",
  measurementId: "G-X4MEWKF2T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;