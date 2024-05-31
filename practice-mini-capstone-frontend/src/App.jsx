import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Content } from './Content'


function Header() {
  return (
    <h1>heading</h1>
  )
}

export function ProductsNew() {}

export function ProductsIndex(props) {

  return (
    <div id ="products-index">

      {props.products.map(p => {
        return (
          <div key={p.id}>

            <h2>{p.name} | {p.supplier.name}</h2>

            <img src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>

            <ul>
              <li>${p.price} </li>
              <li>{p.in_stock} in stock</li>
            </ul>
            <button>info</button>


          </div>
        )
      })
    }


    </div>
  )
}
  


function Footer() {}

function App() {

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;