import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ProductsNew, ProductsIndex } from './App';


export function Content() {
  const [data, setData] = useState([]);


  const getAllProducts = () => {
    console.log('clicked!');
    axios.get('http://localhost:3000/products.json')
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(getAllProducts, []);


  return (
    <main>
      <ProductsNew />


      <button onClick={getAllProducts}>View Products</button>
      <h1>Products</h1>


      <ProductsIndex products={data}/>
    </main>
  );
}
