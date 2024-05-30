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

            <p>${p.price} | {p.color} | {p.in_stock} </p>

            <p> {p.categories}</p>

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