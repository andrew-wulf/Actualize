

export function Search(props) {

  let products = props.products;

  if (products && products.length > 0) {
    return (
      <div className="search-results">
  
        {
          products.map(prod => {
              return (
                <div key={prod.key} className="result-row" onClick={() => {window.location.href = `/products/${prod.id}`}}>

                  <div className="img-container"> 
                    <img src={""}></img>
                  </div>

                  <div className="info-container">
                    <p>{prod.name}</p>
                  </div>
                
                </div>
              )
          })
  
        }
  
      </div>
    )
  }
}