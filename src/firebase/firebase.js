/**Dependencies */

import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//Config 

import config from './config';
/*tal vez se use firebaseConfig en vez de config*/

firebaseApp.initializeApp(config);


/*estos siguiente comandos permiten el login y logout con google primero se debe importar firebase/auth*/
export const auth = firebaseApp.auth();
export const provider = new firebaseApp.auth.GoogleAuthProvider();
export const loginWithGoogle = () => auth.signInWithPopup(provider);
export const logout = () => auth.signOut();

export const fireStore = firebaseApp.firestore() ;

export default firebaseApp;