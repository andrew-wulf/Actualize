export function CarsIndex(props) {

  if (props.cars.length > 0) {
    return (
      
      <div className="index">
        {
          props.cars.map(car => {
            return (
              <div key={car.id}>
                <h2>{car.make} {car.model}</h2>
                <h3>{car.year}</h3>
                <img src={car.image_url} onClick={() => {props.view(car.id)}}></img>
              </div>
              )
          })
        }
      </div>
    )
  }
}