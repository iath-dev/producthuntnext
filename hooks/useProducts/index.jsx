import React from 'react';
import { FirebaseContext } from '../../firebase';

/**
 * Hook para traer los productos
 * @param {'created' | 'votes'} order Orden de los productos
 */
const useProducts = (order = 'created') => {
  const [projects, setProjects] = React.useState([]);
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const getProducts = async () => {
      firebase.db
        .collection('products')
        .orderBy(order, 'desc')
        .onSnapshot(snap => {
          const docs = [];
          snap.forEach(doc => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setProjects(docs);
        });
    };

    getProducts();
  }, []);

  return {
    projects,
  };
};

export default useProducts;
