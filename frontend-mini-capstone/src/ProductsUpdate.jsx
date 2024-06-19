

export function ProductsUpdate() {
  return (
    <div>
      <div className="header-grid">
        <h2 className="title">{prod.name}</h2>
        <h2 className="supplier">{prod.supplier.name}</h2>
      </div>
      <p>{prod.description}</p>

      <form onSubmit={handleSubmit}>
        <label>Color <input type="text" name="color" onChange={e => {e.preventDefault; props.setColor(e.target.value)}} value={props.color}/></label>
        <label>Material <input type="text" name="material" onChange={e => {e.preventDefault; props.setMaterial(e.target.value)}} value={props.material}/></label>
        <label>Image Url <input type="url" name="url" onChange={e => {e.preventDefault; props.setUrl(e.target.value)}} value={props.url}/></label>

        <div className="grid-container">
        <img src="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>

      </form>

    </div>
  )
}