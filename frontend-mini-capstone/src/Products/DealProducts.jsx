import { useState, useEffect } from "react";
import axios from 'axios';
import { ProductsIndex } from "./ProductsIndex";

export function DealProducts(props) {


  const fetchDeals = () => {
    axios.get(`http://localhost:3000/products/deals.json`)
      .then(response => {
        console.log(response);
        props.setProducts(response.data);
        props.setCategory("Current Deals");
      })
      .catch(error => {
        console.log(error)
      });
  }
  useEffect(fetchDeals, []);


  return (
    <ProductsIndex products={props.products} category={props.category} />
  )
  
}