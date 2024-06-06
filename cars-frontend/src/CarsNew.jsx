
export function CarsNew(props) {

  const handleSubmit = (e) => {
    const params = new FormData(e.target);
    props.create(params)
  }

  return (
    <div>
      <h1>New Car:</h1>
      <form onSubmit={handleSubmit}>

        <label> Make<input name="make" /> </label>
        <label> Model<input name="model" /> </label>
        <label> Year<input name="year" /> </label>
        <label> url<input name="image_url" /> </label>
        <button type="submit">Add Car</button>
      </form>
    </div>
    
  )
}