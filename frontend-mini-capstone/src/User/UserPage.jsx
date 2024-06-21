import { formatCurrency, formatDate } from "../Misc/Functions"

export function UserPage(props) {

  let user = props.user

  if (user) {
    return (
      <div>
        <h1>User Page</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>Orders</h2>
        {
          user.orders.map(order => {
            return (
              <div key={order.id}>
                <h3>{formatDate(order.date)} | id# {order.id}</h3>
                
                <div>
                  <p>{formatCurrency(order.total)}</p>
                  {
                    order.products.map(prod => {
                      let name = prod.name;
                      if (prod.quantity > 1) {
                        name = `${name} - x${prod.quantity}` 
                      }
                      return (
                        <div key={prod.id}>
                          <p>{name}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}