//Nesse arquivo fazemos a conexão com o firebase
import firebase from 'firebase/compat/app';

//importa o que vai ser usado
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUvP26C3Cjrt21LiqrnycLQlvihSjgY5c",
  authDomain: "letmeask-5ea29.firebaseapp.com",
  databaseURL: "https://letmeask-5ea29-default-rtdb.firebaseio.com",
  projectId: "letmeask-5ea29",
  storageBucket: "letmeask-5ea29.appspot.com",
  messagingSenderId: "400742982552",
  appId: "1:400742982552:web:ccea0f96bb16dcf4d8c1ed"
};

// iniciando o app com as configurações do firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database } 