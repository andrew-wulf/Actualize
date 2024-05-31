import {PostsUpdate} from './PostsUpdate'




export function PostsShow(props) {

  let post = props.post;

  if (post === undefined) {
    return (
      <div>
      <h3>No Data!</h3>
      </div>
    )
  }

  else {
    return (
      <div id="modal_content">
        <div>
          <h3>Post ID {post.id}</h3>
          <h3>{post.title}</h3>
          <p> {post.body}</p>
        </div>
        <img src={post.image}></img>


        <PostsUpdate id={post.id}/>
          <div className="nav">
            <button onClick={props.nextPost}> Next Post </button>
            <button onClick={props.prevPost}> Prev Post </button>
          </div>
          
        


      </div>
    )
  }
  
}