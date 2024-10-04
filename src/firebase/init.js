import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdjP9tnwV8kTwj9af_ORPqEgurt0WqD7E",
  authDomain: "week7-jianghan.firebaseapp.com",
  projectId: "week7-jianghan",
  storageBucket: "week7-jianghan.appspot.com",
  messagingSenderId: "1041747581161",
  appId: "1:1041747581161:web:0533d824e9be7d69797878",
  measurementId: "G-61J28XJ6YZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
