import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useProducts } from '../hooks';
import { ProductDetails } from '../components';

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;
  const { projects } = useProducts('created');
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const search = q.toLowerCase();
    const filter = projects.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.company.toLowerCase().includes(search) ||
        p.creator.name.toLowerCase().includes(search)
    );
    setProducts(filter);
  }, [q, projects]);

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            <ul>
              {products.map(product => (
                <ProductDetails key={product.id} item={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
