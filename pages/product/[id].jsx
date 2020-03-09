import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Error404 } from '../../components';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import moment from 'moment';
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
    const { query: { id } } = router;
    const { firebase } = React.useContext(FirebaseContext);
    const [product, setProduct] = React.useState({});
    const [error, setError] = React.useState(false);

    React.useEffect(() => {

        const getProduct = async () => {
            try {
                await firebase.db.collection('products').doc(id).get().then(doc => {
                    if (doc.exists) {
                        setProduct(doc.data());
                    } else {
                        setError(true);
                    }
                })
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }
        if (id) {
            getProduct();
        }
    }, [id])

    if (error) return <Error404 />
    if(Object.keys(product).length === 0) return <p>Cargando....</p>

    const { comments, created, description, name, company, url, urlImg, votes } = product;

    return (
        <Layout>
            <React.Fragment>
                <div className="contenedor">
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >{name}</h1>
                    <Container>
                        <div>
                            <p>Publicado el: {moment(created).format('ll')}</p>
                            <img src={urlImg} alt="Imagen producto" />
                            <p>{description}</p>
                            <h2>Agrega tu comentario</h2>
                            <form>
                                <Field>
                                    <input
                                        type="text"
                                        name="message"
                                    />
                                </Field>
                                <InputSubmit
                                    type="submit"
                                    value="Añadir comentario"
                                />
                            </form>
                            <h2 css={css`
                                margin: 2rem 0;
                            `}>Comentarios</h2>
                            <ul>
                            {comments.map(({ name, userName, id }) => (
                                <li key={id}>
                                    <p>{name}</p>
                                    <p>Escrito por: {userName}</p>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <aside>
                                <Button
                                    target="_blank"
                                    bgColor
                                    href={url}
                                >
                                    Visitar URL
                                </Button>
                                <div css={css`
                                    margin: 5rem 0;
                                `}>
                                    <Button>
                                        Votar
                                    </Button>
                                    <p css={css`
                                        text-align: center
                                    `}>{votes} Votos</p>
                                </div>
                        </aside>
                    </Container>
                </div>
            </React.Fragment>
        </Layout>
    );
}
 
export default Product;
