/* eslint-disable no-return-await */
import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  async Register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: name,
    });
  }

  async Login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async LogOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
