import app from 'firebase/app';
import 'firebase/auth';
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAKbMI9zVmkiaTXa56N3FaexqSnAAdw3v0",
    authDomain: "ecommercefrontend.firebaseapp.com",
    databaseURL: "https://ecommercefrontend.firebaseio.com",
    projectId: "ecommercefrontend",
    storageBucket: "ecommercefrontend.appspot.com",
    messagingSenderId: "892388913938"
  };
  app.initializeApp(config);

  export default app;

