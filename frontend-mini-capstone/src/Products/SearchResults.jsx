import { ProductsIndex } from "../Products/ProductsIndex";
import { useState, useEffect } from "react";
import axios from 'axios';

export function SearchResults(props) {

  const [results, setResults] = useState([]);
  const [text, setText] = useState("");

  const getResults = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let val = url.substring(x + 1, url.length);
    setText(val.replace('%20', ' '));

    console.log('Searching...')
    axios.get(`http://localhost:3000/products/search/${val}.json`, {
      params: {
        limit: 200,
        offset: 0
      }
    })
      .then(response => {
        console.log(response);
        setResults(response.data);
      })
      .catch(error => {
        console.log(error)
      });
  };
  useEffect(getResults, []);


  return (
    <ProductsIndex products={results} category={`Search results for "${text}"`}/>
  )

}