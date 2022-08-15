importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAFAqA-RhWQsgwej14mbvZYvLSOihIz9ZE",
    authDomain: "ips-ag.firebaseapp.com",
    projectId: "ips-ag",
    storageBucket: "ips-ag.appspot.com",
    messagingSenderId: "358354598029",
    appId: "1:358354598029:web:7f7a1fcc322bd0aadc4ac4",
    measurementId: "G-YBDBEDLYCB"
});

const messaging = firebase.messaging();