import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyDppC9yKH9sYo17EFDQ2ycqA2ei58SejaA",
  authDomain: "paff-v77.firebaseapp.com",
  databaseURL: "https://paff-v77.firebaseio.com",
  projectId: "paff-v77",
  storageBucket: "paff-v77.appspot.com",
  messagingSenderId: "123103638005",
  appId: "1:123103638005:web:aeaf545831819acc5630bc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
