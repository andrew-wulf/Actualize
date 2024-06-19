import { useState, useEffect } from "react";
import {Modal} from './Modal.jsx';
import { ProductsShow } from './ProductsShow.jsx';
import { ProductsNew } from './ProductsNew.jsx';
import axios from 'axios';

export function ProductsIndex(props) {

 
  const [currentProduct, setCurrentProduct] = useState({});

  let products = props.products;



  const handleCreateProduct = (params, e) => {
    axios.post('http://localhost:3000/products/create.json', params)
    .then(response => {
      console.log(response);
      handleNewProductClose();
      e.target.reset();
      let newProducts = products;
      newProducts.push(response.data);
      setProducts(newProducts);
    })
    .catch(error => {
      console.log(error);
    })
  }

  

  if (products.length > 0) {
    return (
      <div className='productsIndex'>

        <h1>{props.category}</h1>
  
        <div className='products'>
          {
            products.map(row => {
              let price_row = <p>{row.price}</p>;
              if ((row.on_sale) !== undefined) {
                price_row = <p>{row.price} | {row.on_sale} off!</p>
              }
            return (
              <div className='productRow' key={row.id}> 
            
                <img onClick={() => {window.location.href = `/products/${row.id}`}} src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                <a onClick={() => {window.location.href = `/products/${row.id}`}}>{row.name}</a>
                {price_row}
                <p>{row.in_stock}</p>

              </div>
            )
          })
            
          }
        </div>
        
      
      </div>
    )
  }

  else {
    return (
      <h2 className='fetchMessage'>Fetching Products...</h2>
    )
  }
  
  
}