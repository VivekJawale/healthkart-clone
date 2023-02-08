
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtXqYtFXTyxBoMRM1Tn7mtBKOBSY65MxE",
    authDomain: "mysugarclone.firebaseapp.com",
    projectId: "mysugarclone",
    storageBucket: "mysugarclone.appspot.com",
    messagingSenderId: "240767043211",
    appId: "1:240767043211:web:6276e269fd6a18f661368e"
};

const app = initializeApp(firebaseConfig);
export const authentification=getAuth(app);