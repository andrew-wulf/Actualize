import axios from 'axios';
import {useState, useEffect} from 'react';


export function Header(props) {

  const [currentUser, setCurrentUser] = useState({});

  const logout = (e) => {
    e.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }

  const userInfo = () => {
    axios.get('http://localhost:3000/users/current.json')
    .then(response => {
      console.log(response);
      setCurrentUser(response.data);
      console.log(currentUser.name)
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  useEffect(userInfo, []);

  if (currentUser.name !== undefined) {
    return (
      <div id="header">
        <h2>Welcome, {currentUser.name}! </h2>
        
        <button onClick={logout}>Sign Out</button>
      </div>
    )
  }

  else {
    return (
      <div id="header">
        <h2>Log in or create an account to make purchases.</h2>
        <button onClick={() => props.showSignup(true)}>Sign Up</button>
        <button onClick={() => props.showLogin(true)}>Sign In</button>
      </div>
    )
  }
      

}