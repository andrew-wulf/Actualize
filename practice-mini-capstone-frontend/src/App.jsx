import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Content } from './Content'


function Header() {
  return (
    <header>
      <h1>Andrew's Store</h1>
      <ul>
        <li>
          <a>All Products</a>
        </li>
          <li>
          <a>Search</a>
        </li>
          <li>
          <a>My Cart</a>
        </li>
      </ul>
    </header>
  )
}

export function ProductsNew() {}

export function ProductsIndex(props) {

  return (
    <div>
      <h1 className='products-title'>All Products</h1>
      <div id ="products-index">
        

        {props.products.map(p => {
          return (
            <div key={p.id}>

              <img src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>

              <h2>{p.name} </h2>
              <p className='supplier'>{p.supplier.name}</p>
              <p className='price'>${p.price}</p>

              <button>Add to cart</button>
            </div>
          )
        })
      }


      </div>
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