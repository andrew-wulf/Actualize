
export function ProductsNew(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData();

    // simplifying test case by automatically setting most of the values
    params.append('name', e.target.name.value);
    params.append('price', e.target.price.value * 100);
    params.append('description', e.target.description.value);
    params.append('in_stock', 30);
    params.append('on_sale', 0);
    params.append('categories', ["Jewelry"])
    params.append('color', 'blue');
    params.append('material', 'plastic');
    params.append('weight', 1000);
    params.append('country_of_origin', 'Germany')
    params.append('supplier_id', 10)

    props.createProduct(params, e);

  }

  return (
    <div className="newProduct">
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name <input name="name" type="text"/>
          </label>
        <label>
          Price <input name="price" type="text"/>
          </label>
        <label>
          Description <input name="description" type="text"/>
        </label>

        <button type="submit">submit</button>
      </form>

    </div>
  )
}