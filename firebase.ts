import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

// const settings = {timestampsInSnapshots: true};

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyBYLNmIf2Y-XY5VG19H9wgIkR1Vb8ak058",
  authDomain: "my-awesome-project-4e528.firebaseapp.com",
  databaseURL: "https://my-awesome-project-4e528.firebaseio.com",
  projectId: "my-awesome-project-4e528",
  storageBucket: "my-awesome-project-4e528.appspot.com",
  messagingSenderId: "48677431162",
  appId: "1:48677431162:web:528d5ffec2a5090c8f98c3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


      // database.settings(settings)

export  {firestore, storage ,firebase as default} 