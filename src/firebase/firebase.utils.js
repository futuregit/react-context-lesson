import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCFtGFV5O42l55uEcVwcORdqChJ4O_Xmg4',
  authDomain: 'crwn-db-2cfba.firebaseapp.com',
  projectId: 'crwn-db-2cfba',
  storageBucket: 'crwn-db-2cfba.appspot.com',
  messagingSenderId: '781441015913',
  appId: '1:781441015913:web:3f09fcf3f5f637e765c2f8',
  measurementId: 'G-FGVPREMDQH'
};

firebase.initializeApp(config);

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
