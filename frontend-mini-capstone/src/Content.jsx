import { useState, useEffect} from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import {Modal} from './Modal.jsx';
import { ProductsShow } from './ProductsShow.jsx';
import { ProductsNew } from './ProductsNew.jsx';



export function Content() {

  const [products, setProducts] = useState({});
  const [isProductVisible, setProductVisible] = useState(false);
  const [isNewProductVisible, setNewProductVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});


  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [url, setUrl] = useState("");
  
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
  //console.log(products);

  const getProductByID = (id, func) => {
    let i = 0;
    while (i < products.length) {
      if (products[i].id === id) {
        func(i);
      }
      i++;
    }
  }

  const handleShowProduct = (id) => {
    console.log(id);
    setProductVisible(true);
    getProductByID(id, (i) => {

      setCurrentProduct(products[i]);
      console.log('id found!');

      setColor(products[i].color);
      setMaterial(products[i].material);
      if (products[i].images.length > 0) {
        setUrl(products[i].images[0]);
      }
    })
  }

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
      setProductVisible(false);
      let newProducts = products;
      let i = 0;
      while (i < products.length) {
        if (products[i].id === id) {
          newProducts.splice(i, 1);
          break;
        }
        i++;
      }
    setProducts(newProducts);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleShowClose = () => {
    console.log('closing...')
    setProductVisible(false);
  }

  const handleNewProduct = () => {
    setNewProductVisible(true);
  }

  const handleNewProductClose = () => {
    console.log('closing...')
    setNewProductVisible(false);
  }


  return (
    <div className='content'>
      <button onClick={handleNewProduct}>New Item</button>
      <ProductsIndex data={products} showCommand={handleShowProduct}/>

      <Modal show={isProductVisible} onClose={handleShowClose}>
        <ProductsShow currentProduct={currentProduct} updateProduct={handleUpdateProduct} deleteProduct={handleDeleteProduct} color={color} setColor={setColor} material={material} setMaterial={setMaterial} url={url} setUrl={setUrl}/>
      </Modal>

      <Modal show={isNewProductVisible} onClose={handleNewProductClose}>
        <ProductsNew />
      </Modal>
    </div>
  )
}