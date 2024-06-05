
export function CarsShow(props) {
  let car = props.car;
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.update(params)
  }

  return (
    <div className="show">
      <h2>{car.make} {car.model}</h2>
      <h3>{car.year}</h3>
      <img src={car.image_url}></img>


      <form onSubmit={handleSubmit}>
        <input name="image_url" value={props.url} onChange={(e) => props.setUrl(e.target.value)}/>
        <button type="submit">Update Image</button>
      </form>
      <button onClick={props.delete}>delete</button>
    </div>
  )
}