import { useState, useEffect} from 'react';
import axios from 'axios';
import { ProductsIndex } from './ProductsIndex';
import {Modal} from './Modal.jsx';
import { ProductsShow } from './ProductsShow.jsx';
import { ProductsNew } from './ProductsNew.jsx';
import { SignUp } from './Signup.jsx';
import { SignIn } from './SignIn.jsx';
import { Search } from './Search.jsx';
import { Routes, Route } from 'react-router-dom';

export function Content(props) {

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


  const login = (params) => {
    axios.post('http://localhost:3000/sessions.json', params)
      .then(response => {
        console.log(response);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signup = (params) => {
    axios.post('http://localhost:3000/users.json', params)
      .then(response => {
        console.log(response);
        login(params);
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  return (
    <div className='content'>

      <div className='search-overlay' style={{'height': props.searchHeight}}>
        <Search val={props.searchVal} products={products}/>
      </div>

      <div onClick={() => {props.setSearchHeight('0%')}}>
        <Routes>
          <Route path="/signin" element={
            <SignIn login={login}/>}/>
          
          <Route path="/signup" element={<SignUp signup={signup}/>} />
          

          <Route path="/" element={
            <div> 
              <button onClick={handleNewProduct}>New Item</button>
            
              <ProductsIndex data={products} showCommand={handleShowProduct}/>
            </div>
          }/>


          
        </Routes>
      </div>

      <Modal show={isProductVisible} onClose={handleShowClose}>
        <ProductsShow currentProduct={currentProduct} updateProduct={handleUpdateProduct} deleteProduct={handleDeleteProduct} color={color} setColor={setColor} material={material} setMaterial={setMaterial} url={url} setUrl={setUrl}/>
      </Modal>

      <Modal show={isNewProductVisible} onClose={handleNewProductClose}>
        <ProductsNew createProduct={handleCreateProduct}/>
      </Modal>
    </div>


  )
}