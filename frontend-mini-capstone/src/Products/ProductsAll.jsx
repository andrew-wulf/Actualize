import axios from 'axios';
import { useState, useEffect } from 'react';

import { ProductsIndex } from './ProductsIndex';

export function ProductsAll(props) {

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products.json', {
      params: {
        limit: 200,
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
    <div>
      <ProductsIndex products={props.products} category={'All Products'}/>
    </div>
  )
}


// Things I'm working on: 
// adding limit and offset to index actions (variables keep track of which "page" you're on, and the offset multiplies by the page each time. The new result is appended to products. A button outside of ProductsIndex can "show more".)
// actually styling the app (start with pretty header & index page, then tackle product show)
// look into DRY css (try and apply broad attributes like flexbox and img-container)
// maybe do the deals index (since it's fast, just sort by percent off)

// once search is done and styling underway, THEN add quick user page and start building out the cart feature
// add user checkout (an order is created, and a user can see their past orders)