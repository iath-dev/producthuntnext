import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import moment from 'moment';
import shortid from 'shortid';
import { FirebaseContext } from '../../firebase';
import { Layout, Error404 } from '../../components';
import { Field, InputSubmit } from '../../components/UI/form';
import { Button } from '../../components/UI';

const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Product = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { firebase, user } = React.useContext(FirebaseContext);
  const [product, setProduct] = React.useState({});
  const [error, setError] = React.useState(false);
  const [consult, setConsult] = React.useState(true);
  const [comment, setComment] = React.useState({});

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        await firebase.db
          .collection('products')
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              setProduct(doc.data());
            } else {
              setError(true);
            }
            setConsult(false);
          });
      } catch (e) {
        // console.log(e);
        setError(true);
        setConsult(false);
      }
    };
    if (id && consult) {
      getProduct();
    }
  }, [id, consult]);

  if (Object.keys(product).length === 0 && !error) return <p>Cargando....</p>;

  const {
    comments,
    created,
    description,
    name,
    company,
    url,
    urlImg,
    votes,
    creator,
    voted,
  } = product;

  const handleVotes = () => {
    if (!user) {
      return router.push('/login');
    }

    const { uid } = user;

    const total = votes + 1;

    if (voted.includes(uid)) return null;

    const hasVoted = [...voted, uid];

    // Actualizar la BD

    firebase.db
      .collection('products')
      .doc(id)
      .update({ votes: total, voted: hasVoted });

    // Actualizar el State
    setProduct({ ...product, votes: total, voted: hasVoted });
    return setConsult(false);
  };

  /**
   * Función de manejo de comentarios
   * @param {event} event Evento de edición de comentarios
   */
  const commentChange = event => {
    setComment({ ...comment, [event.target.name]: event.target.value });
  };

  /**
   * Función para añadir el comentario
   * @param {event} event Evento de submit
   */
  const addComment = event => {
    event.preventDefault();

    if (!user) {
      return router.push('/login');
    }

    const body = {
      ...comment,
      uid: user.uid,
      name: user.displayName,
      id: shortid.generate(),
    };

    const newComments = [...comments, body];

    // Actualizar la BD

    firebase.db
      .collection('products')
      .doc(id)
      .update({ comments: newComments });

    // Actualizar el State
    setProduct({ ...product, comments: newComments });
    return setConsult(false);
  };

  const getCreator = (i, c) => {
    if (user) {
      switch (i) {
        case user.uid:
          return 'Tu';
        case creator.uid:
          return 'Creador';
        default:
          return c;
      }
    } else {
      if (i === creator.uid) {
        return 'Creador';
      }
      return c;
    }
  };

  const canDelete = () => {
    if (!user) return false;
    if (creator.uid === user.uid) return true;
    return false;
  };

  // Borrar producto
  const deleteProduct = async () => {
    if (!canDelete()) {
      return null;
    }
    try {
      await firebase.db
        .collection('products')
        .doc(id)
        .delete();
      return router.push('/');
    } catch (e) {
      return null;
    }
  };

  return (
    <Layout>
      {error ? (
        <Error404 />
      ) : (
        <>
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>
            <Container>
              <div>
                <p>{`Publicado el: ${moment(created).format('ll')}`}</p>
                <p>{`Publicado por: ${creator.name} de ${company}`}</p>
                <img src={urlImg} alt="Imagen producto" />
                <p>{description}</p>
                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={addComment}>
                      <Field>
                        <input
                          type="text"
                          name="message"
                          onChange={commentChange}
                        />
                      </Field>
                      <InputSubmit type="submit" value="Añadir comentario" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comments.length === 0 ? (
                  <p>No hay comentarios</p>
                ) : (
                  <ul>
                    {comments.map(com => (
                      <li
                        key={com.id}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                          margin: 1rem 0;
                        `}
                      >
                        <p>{com.message}</p>
                        <p>
                          Escrito por:
                          <span
                            css={css`
                              font-weight: 700;
                            `}
                          >
                            {getCreator(com.uid, com.name)}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <Button target="_blank" bgColor href={url}>
                  Visitar URL
                </Button>
                <div
                  css={css`
                    margin: 5rem 0;
                  `}
                >
                  {user && <Button onClick={handleVotes}>Votar</Button>}
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {`${votes} Votos`}
                  </p>
                </div>
              </aside>
            </Container>
          </div>
          {canDelete && <Button onClick={deleteProduct}>borrar</Button>}
        </>
      )}
    </Layout>
  );
};

export default Product;
