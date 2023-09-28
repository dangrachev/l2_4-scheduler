import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtnWChD4LQoZ729AXnCdfbehFpSWK2CAA",
    authDomain: "my-scheduler-1c7fa.firebaseapp.com",
    projectId: "my-scheduler-1c7fa",
    storageBucket: "my-scheduler-1c7fa.appspot.com",
    messagingSenderId: "744720560697",
    appId: "1:744720560697:web:ee4ac7a41c26b31a5b13e8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);