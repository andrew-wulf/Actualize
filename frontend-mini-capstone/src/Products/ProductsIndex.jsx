import { useState, useEffect } from "react";
import {Modal} from '../Misc/Modal.jsx';
import { ProductsShow } from './ProductsShow.jsx';
import { ProductsNew } from './ProductsNew.jsx';
import axios from 'axios';
import { formatCurrency } from "../Misc/Functions.jsx";

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';



export function ProductsIndex(props) {

  const [page, setPage] = useState(1);
  const [buttonVisible, setButtonVisible] = useState('visible');
  
  
  useEffect(() => {
    if (props.products && page) {
      let count = props.products.length;
      let limit = Math.min(count, (page * 50));
  
      if (limit >= props.products.length) {
        setButtonVisible('hidden');
      }
      else {
        setButtonVisible('visible');
      }
    }
  }, [page]);

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
  

  if (props.products.length > 0) {
    let count = props.products.length;
    let limit = Math.min(count, (page * 50));
    let products = props.products.slice(0, limit);
    return (
      <div className='productsIndex'>

        <h1>{props.category}</h1>
  
        <div className='products'>
          {
            products.map(row => {
              let price_row = <h4>{formatCurrency(row.total)}</h4>;
              if ((row.percent_off) && row.percent_off > 0) {
                price_row = <div className="vertical-flex">         
                              <h4 className="latter">{formatCurrency(row.total)}</h4>
                              <div className="flexbox">
                                <p className="former">{formatCurrency(row.price)}</p>
                                <p>{row.percent_off}% off</p>
                              </div>
                            </div>
              }             
              let visibility = 'hidden';
              let message = `${row.in_stock} left in stock!`
              if (row.in_stock < 10) {
                visibility = 'visible'
              }
              if (row.in_stock === 0) {
                message = 'Sold Out'
              }

              
            return (
              <Stack className='productRow' key={row.id}> 

                <div id='img-container'>
                  <Image onClick={() => {window.location.href = `/products/${row.id}`}} src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" fluid></Image>
                </div>
                <a onClick={() => {window.location.href = `/products/${row.id}`}}>{row.name}</a>
          
                <Stack direction="horizontal" className="flexbox">
                  <h5>{price_row}</h5>
                  <h6 style={{'visibility': visibility}}>{message}</h6>
                </Stack>
              

              </Stack>
            )
          })
            
          }
        </div>
        <p>Showing {limit} of {count} results</p>
        <Button variant="dark" onClick={() => {
            setPage(page + 1);
          }
        } style={{'visibility': `${buttonVisible}`}}>Show More</Button>
      </div>
    )
  }

  else {
    return (
      <div>
      </div>
    )
  }
  
  
}