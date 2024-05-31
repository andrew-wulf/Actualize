import axios from "axios";


export function PostsUpdate(props) {



  const handleUpdate = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);

    axios.patch(`http://localhost:3000/posts/${props.id}.json`, params).then(response => {
      console.log(response)
    });
    
  }



  return (
    <div>
      <form onSubmit={handleUpdate}>
          <label>
            New Image Url: <input type='url' name="image"/>
          </label>
          
          <button type='submit'>Update</button>
          <button className="destroy">Remove Post</button>
      </form>
    </div>
  )

}



