import './css/Header.css'
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Search } from './Misc/Search';

import { FaCartPlus } from "react-icons/fa";


export function Header(props) {


  const [categories, setCategories] = useState([]);

  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [valCache, setValCache] = useState([]);
  const [resultsCache, setResultsCache] = useState([]);

  const signOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = window.location.href;
  }

  const handleChange = (e) => {
    let val = e.target.value
    setSearchVal(val);
    if (val.length > 0) {
      val = val.replace(' ', '%20')
      props.lower('search');

      if (valCache.includes(val)) {
        setSearchResults(resultsCache[valCache.indexOf(val)]);
      }
      else {
        search(val);
      }
    }
    else {
      props.reset();
    }
  }
  
  const search = (val) => {
    console.log('Searching...')
    axios.get(`http://localhost:3000/products/search/${val}.json`, {
      params: {
        limit: 5
      }
    })
      .then(response => {
        console.log(response);
        setSearchResults(response.data);
        let c1 = valCache;
        let c2 = resultsCache;
        c1.push(val);
        c2.push(response.data);
        setValCache(c1);
        setResultsCache(c2);
      })
      .catch(error => {
        console.log(error)
      });
  }
 
  const getCategories = () => {
    axios.get('http://localhost:3000/categories.json')
      .then(response => {
        console.log(response);
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(getCategories, []);

  const selectCategory = (name) => {
    props.reset();
    window.location.href = `/categories/${name}`
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let text = e.target[0].value;
    text = text.replace(' ', '%20');
    window.location.href = `/search/${text}`;
  }


  if (props.user) {
    let msg = `${props.user.name}`;

    if (props.user.admin === true) {
      msg = msg + ' (admin)'
    }
    let cartCount = props.user.cart_size || "";
    if (cartCount !== "") {
      cartCount = `(${cartCount})`
    }

    console.log(props.user)

    return (
      <div>
        <div className="header">
          <h1 onClick={() => {window.location.href = "/"}}>Drew-Mart</h1>

          <form onSubmit={handleSubmit}>
            <input id="searchBar" type="search" placeholder="Search projects, creators and categories" value={searchVal} onChange={handleChange}/>
          </form>

          <div className="flexbox"> 
            <h2 onClick={() => {window.location.href = "/user"}}>{msg}</h2>
          </div>
          
          <h3 onClick={signOut}>Sign Out</h3>
          <div className='flexbox'>
            <h1><FaCartPlus/></h1>
            <h5 onClick={() => {window.location.href = '/cart'}}>My Cart {cartCount}</h5>
          </div>
        </div>

        <div className='subheader'>
   
          <h2 onClick={() => {props.lower('categories')}}>Categories</h2>
          <h2 onClick={() => {window.location.href = "/deals"}}>Deals</h2>
        </div>

        <div className='categories' id="dropdown" style={{'height': props.catHeight}}>
            {
              categories.map(cat => {
                return (
                  <div key={cat.id}>
                    <h4 onClick={() => {selectCategory(cat.name)}}>{cat.name}</h4>
                  </div>
                )
              })

            }
        </div>
        
        <div className='search-drop' style={{'visibility': props.searchVisibility}}>
          <Search val={searchVal} products={searchResults}/>
        </div>
      </div>
    )
  }
  
  else {
    return (
    <div className="header">
      <h1 onClick={() => {window.location.href = "/"}}>Drew-Mart</h1>
      <input id="searchBar" type="search" placeholder="Search projects, creators and categories" value={searchVal} onChange={handleChange}></input>
      <h3 className="signInLink" onClick={() => {window.location.href = "/signin"}}>Sign In</h3>
      <h3 onClick={() => {window.location.href = "/signup"}}>Sign Up</h3>
    </div>
    )
  }
      

}