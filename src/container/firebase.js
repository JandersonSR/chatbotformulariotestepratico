//---- database
//import  firebase from 'firebase/app';
import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';



var firebaseConfig = {
  apiKey: "AIzaSyCBhkG3FMQ42Mz3ZXc9IlNfsjSxrHKp3ho",
  authDomain: "testepraticohellper.firebaseapp.com",
  databaseURL: "https://testepraticohellper-default-rtdb.firebaseio.com",
  projectId: "testepraticohellper",
  storageBucket: "testepraticohellper.appspot.com",
  messagingSenderId: "416506166334",
  appId: "1:416506166334:web:cc6ebe80cb65878e2ca56f",
  measurementId: "G-52TSMT6QT6"
};
var fireDb = firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { displayName, email} = doc.data();
  
      return {
        routeName: encodeURI(displayName.toLowerCase()),
        id: doc.id,
        displayName,
        email
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.displayName.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

export default fireDb.database().ref();