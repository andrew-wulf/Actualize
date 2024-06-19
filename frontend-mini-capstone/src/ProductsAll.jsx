import axios from 'axios';
import { useEffect } from 'react';

import { ProductsIndex } from './ProductsIndex';

export function ProductsAll(props) {

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products.json', {
      params: {
        limit: 50,
        offset: 0
      }
    })
      .then(response => {
        console.log(response);
        props.setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(fetchProducts, []);


  return (
    <ProductsIndex products={props.products} category={'All Products'}/>
  )
}