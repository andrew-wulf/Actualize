import './ProductsShow.css'
import { useState, useEffect } from "react";
import axios from 'axios';

export function ProductsShow(props) {
  
  const [currentProduct, setCurrentProduct] = useState({});

  const getProduct = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let id = url.substring(x + 1, url.length);

    axios.get(`http://localhost:3000/products/${id}.json`)
      .then(response => {
        console.log(response);
        setCurrentProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(getProduct, []);



  const handleUpdateProduct = (params) => {
    let id = currentProduct.id
    axios.patch(`http://localhost:3000/products/${id}.json`, params)
    .then(response => {
      console.log(response)
      let data = response.data;
      let newProducts = products;

      getProductByID(id, (i) => {
        newProducts[i] = data;
        handleShowProduct(newProducts[i].id)
        console.log('product updated!');
      })
      setProducts(newProducts);
    })
    .catch(error => {
      console.log(error)
    });
  }

  const handleDeleteProduct = () => {
    let id = currentProduct.id
    axios.delete(`http://localhost:3000/products/${id}.json`)
    .then(response => {
      console.log(response);
      window.location.href = '/'
    })
    .catch(error => {
      console.log(error);
    });
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.updateProduct(params);

  }

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteProduct();
  }

  if (currentProduct.id !== undefined) {
    let prod = currentProduct;

    return (
      <div className="product-show">
        <div className="header-grid">

          <div id='img-container'>
            <img src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>

          <h2 className="title">{prod.name}</h2>
          <h2 className="supplier">{prod.supplier.name}</h2>
        </div>
        <p>{prod.description}</p>

        <div id='flexbox'>
          <h2>{prod.price}</h2>
          <h3>{prod.in_stock} in stock</h3>
          <h3>{prod.percent_off}% off</h3>
        </div>

        <h2>Details</h2>
        <div id='grid-container'>
          <h3>Color: {prod.color}</h3>
          <h3>Material: {prod.material}</h3>
          <h3>Weight: {prod.weight}</h3>
          <h4>Made in {prod.origin}</h4>
        </div>

      </div>
    )
  }
  
}