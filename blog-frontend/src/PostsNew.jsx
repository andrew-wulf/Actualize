import axios from 'axios'
import { useState } from 'react'

export function PostsNew(props) {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length > 0 && body.length > 0 && image.length > 0)

    {
      axios.post("http://localhost:3000/posts.json", {
      title: title,
      body: body,
      image: image
    })
      setTitle("");
      setBody("");
      setImage("");
    }
    
  }

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  

  return (
    <div id="posts-new">
      <h1>New post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title: <input className="InputTitle" value={title} onChange={e => setTitle(e.target.value)}/>
        </label>

        <label>
          Body: <input className="InputBody" value={body} onChange={e => setBody(e.target.value)}/>
        </label>

        <label>
          Image: <input className="InputImage" value={image} onChange={e => setImage(e.target.value)}/>
        </label>

        <div>
          <button type='submit'>
            Submit!
          </button>
        </div>
      </form>
    </div>
  );
}
