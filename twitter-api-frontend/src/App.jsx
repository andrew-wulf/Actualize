import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from "react";
import axios from 'axios'

function App() {

  const [currentUser, setCurrentUser] = useState("");

  const getUser = () => {
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.jwt
      axios.get('http://localhost:3000/user.json')
        .then(response => {
          console.log(response);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
    }
  }
  useEffect(getUser, []);
  
  return (
    <div>
      
      <BrowserRouter>
        <Header user={currentUser}/>
        <Content user={currentUser} setUser={setCurrentUser}/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;