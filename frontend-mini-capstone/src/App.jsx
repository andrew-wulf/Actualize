import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Content} from './Content.jsx';
import {Header} from './Header.jsx';
import {Footer} from './Footer.jsx';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [currentUser, setCurrentUser] = useState("");

  const [catHeight, setCatHeight] = useState('0');
  const [searchVisibility, setSearchVisibility] = useState('collapse');

  const reset = () => {
    setCatHeight('0');
    setSearchVisibility('collapse');
  }

  const lower = (item) => {
    if (item === 'search') {
      setSearchVisibility('visible');
    }
    if (item === 'categories') {
      setCatHeight('40vh');
    }
  }

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
        <Header user={currentUser} getUser={getUser} catHeight={catHeight} searchVisibility={searchVisibility} lower={lower} reset={reset}/>
        <br/>
        <br/>
        <br/>
        
        <Content user={currentUser} getUser={getUser} lower={lower} reset={reset}/>
        <br/>
        <br/>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
