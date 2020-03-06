import React from 'react';
import { css } from '@emotion/core';
import moment from 'moment';
import FileUploader from 'react-firebase-file-uploader';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { Form, Field, ErrorMessage, InputSubmit } from '../components/UI/form';
import { useValidation } from '../hooks';
import { ValidateProduct } from '../validate';
import { FirebaseContext } from '../firebase';

const INITIAL_STATE = {
  name: '',
  company: '',
  url: '',
  description: '',
};

const Add = () => {
  const [load, setLoad] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlImg, setUrlImg] = React.useState('');
  const [error, setError] = React.useState('');
  const { user, firebase } = React.useContext(FirebaseContext);
  const router = useRouter();

  const handleCreateProducts = async data => {
    try {
      if (!user) {
        setError('Usuario no registrado');
        return;
      }

      const product = {
        ...data,
        votes: 0,
        comments: [],
        urlImg,
        created: moment().valueOf(),
        uid: user.uid,
      };

      await firebase.CreateProduct(product);
      router.push('/');
    } catch (e) {
      setError(e.message);
    }
  };

  const {
    handleBlur,
    handleChanges,
    handleSubmit,
    values,
    errors,
  } = useValidation(INITIAL_STATE, ValidateProduct, handleCreateProducts);

  const { name, company, url, description } = values;

  const handleUploadStart = () => {
    setLoad(true);
    setProgress(0);
  };

  const handleUploadError = e => {
    setLoad(false);
    setError(e.message);
  };

  const handleUploadSuccess = async filename => {
    setProgress(100);
    setLoad(false);
    await firebase.storage
      .ref('products')
      .child(filename)
      .getDownloadURL()
      .then(URL => {
        console.log(URL);
        setUrlImg(URL);
      });
  };

  const handleProgress = p => {
    setProgress(p);
  };

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Nuevo Producto
        </h1>
        <Form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Información general</legend>
            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Nombre del producto..."
                name="name"
                value={name}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            <Field>
              <label htmlFor="company">Compañía</label>
              <input
                type="text"
                id="company"
                placeholder="Compañía a la cual pertenece producto..."
                name="company"
                value={company}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
            </Field>
            {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
            <Field>
              <label htmlFor="img">Imagen</label>
              <FileUploader
                accept="image/*"
                id="img"
                name="img"
                randomizeFilename
                storageRef={firebase.storage.ref('products')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </Field>
            {load && <p>{`Progreso: ${progress}`}</p>}
            <Field>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                placeholder="Pagina del producto..."
                name="url"
                value={url}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
            </Field>
            {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
          </fieldset>
          <fieldset>
            <legend>Sobre tu producto</legend>
            <Field>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                placeholder="Descripción del producto..."
                name="description"
                value={description}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
            </Field>
            {errors.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
          </fieldset>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputSubmit type="submit" value="Crear producto" />
        </Form>
      </>
    </Layout>
  );
};

export default Add;
