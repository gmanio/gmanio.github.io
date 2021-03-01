import React from 'react';
import firebase from '@firebase/app';
import '@firebase/analytics';

import * as Styled from './style';
import Loader from './../../components/Loader';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-UtaT8qDIahMmQuMkfmbjQ7rOsDskVlI',
  authDomain: 'gmanio.firebaseapp.com',
  projectId: 'gmanio',
  storageBucket: 'gmanio.appspot.com',
  messagingSenderId: '588502954065',
  appId: '1:588502954065:web:8d663a30c09d42c9460870',
  measurementId: 'G-J37XHPSSP9',
};

const MainPage: React.FC = () => {
  React.useEffect(() => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }, []);

  return <Styled.Wrapper><Loader/></Styled.Wrapper>;
};

export default MainPage;
