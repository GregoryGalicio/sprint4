/**Dependencies */

import firebaseApp from 'firebase/app';
import 'firebase/firestore';
//Config 

import config from './config';
/*tal vez se use firebaseConfig en vez de config*/

firebaseApp.initializeApp(config);

export const fireStore = firebaseApp.firestore();

export default firebaseApp;