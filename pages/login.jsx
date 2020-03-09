import React from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout';
import { useValidation } from '../hooks';
import { ValidateLogin } from '../validate';
import { FirebaseContext } from '../firebase';
import { Form, Field, InputSubmit, ErrorMessage } from '../components/UI/form';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const LogIn = () => {
  const [error, setError] = React.useState('');
  const { firebase } = React.useContext(FirebaseContext);

  const login = async data => {
    try {
      const user = await firebase.Login(data.email, data.password);
      console.log(user);
      Router.push('/');
    } catch (e) {
      console.log('Hubo un error', e.message);
      setError(e.message);
    }
  };

  const {
    errors,
    handleBlur,
    handleChanges,
    handleSubmit,
    values,
  } = useValidation(INITIAL_STATE, ValidateLogin, login);

  const { email, password } = values;

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Iniciar Sesión
        </h1>
        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <label htmlFor="email">Correo</label>
            <input
              type="text"
              id="email"
              placeholder="Tu Email..."
              name="email"
              value={email}
              onChange={handleChanges}
              onBlur={handleBlur}
            />
          </Field>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Field>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña..."
              name="password"
              value={password}
              onChange={handleChanges}
              onBlur={handleBlur}
            />
          </Field>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputSubmit type="submit" value="Iniciar sesión" />
        </Form>
      </>
    </Layout>
  );
};

export default LogIn;
