import { useState, useEffect} from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import {Modal} from './Modal.jsx';
import { ProductsShow } from './ProductsShow.jsx';



export function Content() {

  const [products, setProducts] = useState({});
  const [isProductVisible, setProductVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  
  const fetchProducts = () => {
    axios.get('http://localhost:3000/products.json')
      .then(response => {
        console.log(response)
        setProducts(response.data)
      })
      .catch(error => {
        console.log(error)
      });
  }
  useEffect(fetchProducts, []);
  console.log(products)

  const handleShowProduct = (id) => {
    console.log(id);
    setProductVisible(true);
    let i = 0;
    while (i < products.length) {
      if (products[i].id === id) {
        setCurrentProduct(products[i]);
        console.log('id found!');
      }
      i++;
    }
  }

  const handleModalClose = () => {
    console.log('closing...')
    setProductVisible(false);
  }
  // useEffect(handleShowProduct, [])

  return (
    <div className='content'>
      <ProductsIndex data={products} showCommand={handleShowProduct}/>

      <Modal show={isProductVisible} onClose={handleModalClose}>
        <ProductsShow currentProduct={currentProduct} />
      </Modal>
    </div>
  )
}