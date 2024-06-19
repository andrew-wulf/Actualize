import { useState, useEffect } from "react";
import axios from 'axios';
import { ProductsIndex } from "./ProductsIndex";

export function CategoryProducts(props) {

  let category = 'test';

  const fetchProducts = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let name = url.substring(x + 1, url.length);

    axios.get(`http://localhost:3000/categories/${name}.json`)
      .then(response => {
        console.log(response);
        props.setProducts(response.data.products);
        props.setCategory(response.data.name);
      })
      .catch(error => {
        console.log(error)
      });
  }
  useEffect(fetchProducts, []);


  

  return (
    <ProductsIndex products={props.products} category={props.category} />
  )
  
}