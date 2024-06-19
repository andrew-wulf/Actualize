import { formatDate } from "./Functions";

export function Search(props) {

  let products = props.products;
  let val = props.val;

  if (products.length > 0 && val.length > 0) {
    return (
      <div className="search-results">
        <h1>Results</h1>
  
        {
          products.map(prod => {
            if (prod.name.toLowerCase().includes(val.toLowerCase())) {
              return (
                <div key={prod.key} className="result-row" onClick={() => {window.location.href = `products/${prod.id}`}}>

                  <div className="img-container"> 
                    <img src={""}></img>
                  </div>

                  <div className="info-container">
                    <h2>{prod.name}</h2>
                  </div>
                
                </div>
              )
            }
          })
  
        }
  
      </div>
    )
  }
}