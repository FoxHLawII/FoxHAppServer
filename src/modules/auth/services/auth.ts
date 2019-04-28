import firebase from 'firebase';

const registerWithEmailAndPassword = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

const loginWithEmailAndPassword = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export default { 
  registerWithEmailAndPassword,
  loginWithEmailAndPassword
}