import React from 'react';
import { useRouter } from 'next/router';
import { Layout, Error404 } from '../../components';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

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
                            11
                        </div>
                        <aside>
                            22
                        </aside>
                    </Container>
                </div>
            </React.Fragment>
        </Layout>
    );
}
 
export default Product;
