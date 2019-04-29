import firebase from 'firebase';

import { generateBytes } from '@utils/generate-random-bytes';
import { User } from '../entities/user';
import { Session } from '../entities/session';
import sessionStore from './session-store';

export const registerWithEmailAndPassword = (email: string, password: string): Promise<Session> => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => generateSession(user));
}

export const loginWithEmailAndPassword = (email: string, password: string): Promise<Session> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => generateSession(user));
}

export const loginWithSessionId = (sessionId: string): Session => {
  const session = sessionStore.getSession(sessionId);
  const isValidSession = !!session && session.isValid();
  if (isValidSession) {
    return session; 
  } else {
    sessionStore.removeSession(sessionId);
    return null;
  }
}

export const logout = (sessionId: string): Promise<void> => {
  sessionStore.removeSession(sessionId);
  return firebase.auth().signOut();
}

async function generateSession(user: firebase.auth.UserCredential): Promise<Session> {
      const sessionId = await generateBytes(32);
      const { token, expirationTime } = await user.user.getIdTokenResult();
      const currentUser: User = { 
        id: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
        phone: user.user.phoneNumber,
        photoUrl: user.user.photoURL
      }
      let session = new Session(sessionId, currentUser, token, expirationTime);
      session = session.isValid() ? session : null;
      sessionStore.addSession(session);
      return session;
}