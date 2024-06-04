

export function ProductsIndex(props) {
  //console.log('showing products index..')

  if (props.data.length > 0) {
    return (
      <div className='productsIndex'>
        <h1>Data will show below:</h1>
  
        <div className='products'>
          {
            props.data.map(row => {
              let price_row = <p>{row.price}</p>;
              if ((row.on_sale) !== undefined) {
                price_row = <p>{row.price} | {row.on_sale} off!</p>
              }
            return (
              <div className='productRow' key={row.id}> 
                
                
                <img onClick={() => {props.showCommand(row.id)}} src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                <a onClick={() => {props.showCommand(row.id)}}>{row.name}</a>
                {price_row}
                <p>{row.in_stock}</p>

              </div>
            )
          })
            
          }
        </div>
        
      </div>
    )
  }

  else {
    return (
      <h2 className='fetchMessage'>Fetching Products...</h2>
    )
  }
  
  
}