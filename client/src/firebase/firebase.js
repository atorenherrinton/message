import firebase from "firebase";
const config = {
    apiKey: "AIzaSyCnv6ETnd1etGK8UtlwB8jYg_WWhvM7rZM",
    authDomain: "message-fe49a.firebaseapp.com",
    projectId: "message-fe49a",
    storageBucket: "message-fe49a.appspot.com",
    messagingSenderId: "499850275859",
    appId: "1:499850275859:web:f3a131364a448ed737a3e6",
    measurementId: "G-26LSP57GB8"
};
firebase.initializeApp(config);
firebase.analytics();

export default firebase;