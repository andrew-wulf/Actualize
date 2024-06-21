import { formatCurrency } from "../Misc/Functions";
import axios from "axios";

export function Cart(props) {

  const checkOut = () => {
    axios.post('http://localhost:3000/cart/checkout.json')
    .then(response => {
      console.log(response);
      window.location.href = "/user";
      window.alert("Purchase Successful!");
    })
    .catch(error => {
      console.log(error);
    })
  }

  let cart = props.user.cart;
  let totals = props.user.cart_totals
  console.log(cart);

  if (cart && cart.length > 0) {
    return (
      <div>
        <h1>Your Cart</h1>

        {
          cart.map(item => {

            return (
              <div key={item.id}> 
                <h2>{item.product.name}</h2>
                <h3>Qty: {item.quantity}</h3>
                <h3>{formatCurrency(item.product.total)}</h3>
              </div>
            )
          })
        
        }
      
      <h2>Subtotal - {formatCurrency(totals.subtotal)}</h2>
      <h2>Tax - {formatCurrency(totals.tax)}</h2>
      <h2>Total: {formatCurrency(totals.total)}</h2>
      <button onClick={checkOut}>Complete Transaction</button>
      </div>
    )  
  }
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Currently Empty</p>
    </div>
  )
}