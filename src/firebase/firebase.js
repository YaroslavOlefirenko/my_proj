import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDg_Zx409H61trfNGQm4YgQhVq2CEek4_M",
  authDomain: "carcheck-a1029.firebaseapp.com",
  projectId: "carcheck-a1029",
  storageBucket: "carcheck-a1029.appspot.com",
  messagingSenderId: "236741823837",
  appId: "1:236741823837:web:798b844e21622ce168ecb4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export { app, auth,db, storage };
