import './Header.css'
import axios from 'axios';
import {useState, useEffect} from 'react';


export function Header(props) {


  const [categories, setCategories] = useState([]);

  const signOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = window.location.href;
  }

  const handleChange = (e) => {
    props.setSearchVal(e.target.value);
    if (e.target.value.length > 0) {
      props.setSearchHeight('40%')
    }
    else {
      props.setSearchHeight('0%')
    }
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


  if (props.user) {
    let msg = `${props.user.name}`;

    if (props.user.admin === true) {
      msg = msg + ' (admin)'
    }

    return (
      <div>
        <div className="header">
          <h1 onClick={() => {window.location.href = "/"}}>Drew-Mart</h1>

          <input id="searchBar" type="search" placeholder="Search projects, creators and categories" value={props.searchVal} onChange={handleChange}/>

          <div className="flexbox"> 
            <h2 onClick={() => {window.location.href = "/user"}}>{msg}</h2>
          </div>
          
          <h3 onClick={signOut}>Sign Out</h3>
          <h3>Cart</h3>
        </div>

        <div className='subheader'>
          <h2>Categories</h2>
          <h2 onClick={() => {window.location.href = "/deals"}}>Deals</h2>
          
          <div className='dropdown'>
            {

              categories.map(cat => {
                return (
                  <h3>{cat.name}</h3>
                )
              })

            }
          </div>

        </div>
      </div>
    )
  }
  
  else {
    return (
    <div className="header">
      <h1 onClick={() => {window.location.href = "/"}}>Andrew's Store</h1>
      <input id="searchBar" type="search" placeholder="Search projects, creators and categories" value={props.searchVal} onChange={handleChange}></input>
      <h3 className="signInLink" onClick={() => {window.location.href = "/signin"}}>Sign In</h3>
      <h3 onClick={() => {window.location.href = "/signup"}}>Sign Up</h3>
    </div>
    )
  }
      

}