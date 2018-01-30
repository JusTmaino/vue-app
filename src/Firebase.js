import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyCXboeagkKETdRjMpT07trqlNfiptq4V_c",
    authDomain: "vuejsmbds.firebaseapp.com",
    databaseURL: "https://vuejsmbds.firebaseio.com",
    projectId: "vuejsmbds",
    storageBucket: "vuejsmbds.appspot.com",
    messagingSenderId: "265003779542"
  };
  export default Firebase.initializeApp(config);