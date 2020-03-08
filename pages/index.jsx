import React from 'react';
import Layout from '../components/layout';
import { FirebaseContext } from '../firebase';
import { ProductDetails } from '../components';

const Home = () => {
  
  const [projects, setProjects] = React.useState([]);
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const getProducts = async () => {
      firebase.db.collection('products').orderBy('created', 'desc').onSnapshot((snap) => {
        const docs = [];
        snap.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setProjects(docs);
      })
    };

    getProducts();
  }, [])

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            <ul>
              {projects.map(product => (
                <ProductDetails
                  key={product.id}
                  item={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Home;
