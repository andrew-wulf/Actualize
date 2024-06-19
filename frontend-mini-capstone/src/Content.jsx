import { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { SignUp } from './Signup.jsx';
import { SignIn } from './SignIn.jsx';
import { ProductsIndex } from './ProductsIndex';
import { ProductsAll } from './ProductsAll.jsx';
import { CategoryProducts } from './CategoryProducts.jsx';
import { ProductsShow } from './ProductsShow.jsx';


export function Content(props) {


  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All Products");


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

      <div onClick={props.reset}>
        <Routes>
          <Route path="/signin" element={
            <SignIn login={login}/>}/>
          
          <Route path="/signup" element={<SignUp signup={signup}/>} />
          

          <Route path="/" element={<ProductsAll products={products} setProducts={setProducts}/>}/>

          <Route path="categories/:name" element={<CategoryProducts products={products} setProducts={setProducts} category={category} setCategory={setCategory}/>} />
          
          <Route path="products/:id" element={<ProductsShow currentProd/>} />
        </Routes>
      </div>


    </div>


  )
}