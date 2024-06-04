
export function ProductsNew() {
  return (
    <div className="newProduct">
      <h1>New Product</h1>
      <form onSubmit={e => {e.preventDefault(); 
      let formData = new FormData(e.target); 
      console.log(formData.keys())}}>
        <label>
          Name <input name="name" type="text"/>
          </label>
        <label>
          Price <input name="price" type="text"/>
          </label>
        <label>
          How many in stock? <input name="in_stock" type="text"/>
          </label>
        <label>
          Categories <input name="categories" type="text"/>
          </label>
        <label>
          Description <input name="description" type="text"/>
          </label>
          <label>
          Image Url <input name="url" type="text"/>
          </label>
          <label>
          Description <input name="description" type="text"/>
          </label>

        <button type="submit">submit</button>
      </form>

    </div>
  )
}