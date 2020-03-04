import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import { Form, Field, InputSubmit, ErrorMessage } from '../components/UI/form';
import { useValidation } from '../hooks';
import { ValidateRegister } from '../validate';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  function CreateAccount(data) {
    console.log('Crear cuenta', data);
  }

  const {
    values,
    errors,
    handleChanges,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, ValidateRegister, CreateAccount);

  const { name, email, password } = values;

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Crear cuenta
        </h1>
        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Nombre..."
              name="name"
              value={name}
              onChange={handleChanges}
              onBlur={handleBlur}
            />
          </Field>
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
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
          <InputSubmit type="submit" value="Crear cuenta" />
        </Form>
      </>
    </Layout>
  );
};

export default Register;
