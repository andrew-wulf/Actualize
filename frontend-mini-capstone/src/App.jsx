
import './App.css';
import {Content} from './Content.jsx';
import {Header} from './Header.jsx';
import {Footer} from './Footer.jsx';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [currentUser, setCurrentUser] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [searchHeight, setSearchHeight] = useState('0%');

  const getUser = () => {
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.jwt
      axios.get('http://localhost:3000/users/current.json')
        .then(response => {
          console.log(response);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      let path = window.location.pathname; 
      if (path === "/user" || path === "/new-product") {
        window.location.href = "/";
      }
    }
  }
  useEffect(getUser, []);


  return (
    <>
      <BrowserRouter>
        <Header user={currentUser} getUser={getUser} searchval={searchVal} setSearchVal={setSearchVal} setSearchHeight={setSearchHeight}/>
        <br/>
        <br/>
        <Content user={currentUser} getUser={getUser} searchVal={searchVal} searchHeight={searchHeight} setSearchHeight={setSearchHeight}/>
        <br/>
        <br/>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
