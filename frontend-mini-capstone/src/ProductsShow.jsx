
export function ProductsShow(props) {

  if (props.productID !== null) {
    let prod = props.currentProduct;
    return (
      <div>
        <h2>{prod.name}</h2>
        <p>{prod.description}</p>
        <p>Color: {prod.color}</p>
        <p>Material: {prod.material}</p>
        <p>Made by {prod.supplier.name}</p>
        <p>{prod.country_of_origin}</p>
        
      </div>
    )
  }
  
}