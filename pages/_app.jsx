/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import PropTypes from 'prop-types';
import firebase, { FirebaseContext } from '../firebase';
import { useAuth } from '../hooks';

const MyApp = ({ Component, pageProps }) => {
  const user = useAuth();
  return (
    <>
      <FirebaseContext.Provider value={{ firebase, user }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
