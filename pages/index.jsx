import React from 'react';
import Layout from '../components/layout';
import { ProductDetails } from '../components';
import { useProducts } from '../hooks';

const Home = () => {
  const { projects } = useProducts('created');

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            <ul>
              {projects.map(product => (
                <ProductDetails key={product.id} item={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
