
import './App.css'
import {Content} from './Content.jsx'
import {Header} from './Header.jsx'
import {Footer} from './Footer.jsx'
import { useState } from 'react'

function App() {
  
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);


  return (
    <>
      <Header showSignup={setSignupVisible} showLogin={setLoginVisible}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Content signupVisible={isSignupVisible} loginVisible={isLoginVisible}
      showSignup={setSignupVisible} showLogin={setLoginVisible}/>
      
      <Footer />
      
    </>
  )
}

export default App
