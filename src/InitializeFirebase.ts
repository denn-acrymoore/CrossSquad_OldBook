// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGvsI9aROYjCb3KUShJLV91tPF3XirRBE",
  authDomain: "cross-uas-297ae.firebaseapp.com",
  projectId: "cross-uas-297ae",
  storageBucket: "cross-uas-297ae.appspot.com",
  messagingSenderId: "455120570384",
  appId: "1:455120570384:web:1da8c05b2ac13cbcfee295",
  measurementId: "G-DPPF0VW7LL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

export default firebaseApp;