import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [heading, setHeading] = useState('Home Page')

  const react = document.getElementById("react")
  const vite = document.getElementById("vite")

  function button_press() {
    setCount((count) => count + 1);
    let num = count + 1 
    if (num % 5 == 0) {
      react.className = 'true';
      if (num % 3 == 0) {
        vite.className = 'true';
        setHeading(() => "FizzBuzz")
      }
      else {
        vite.className = 'false';
        setHeading(() => "Buzz")
      }
    }
    else {
      react.className = 'false';
      if (num % 3 == 0) {
        vite.className = 'true';
        setHeading(() => "Fizz")
      }
      else {
        vite.className = 'false';
        setHeading(() => "Home Page")
      }
    }
  }



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" id="vite" className='false'>
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank" id="react" className='false'>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{heading}</h1>
      <div className="card">
        <button onClick={() => button_press()} >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
