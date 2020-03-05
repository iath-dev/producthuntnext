import React from 'react';
import firebase from '../../firebase';

const useAuth = () => {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    const subscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });

    return () => subscribe();
  }, [auth]);

  return auth;
};

export default useAuth;
