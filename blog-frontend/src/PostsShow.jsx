

export function PostsShow(props) {

  let post = props.post;
  
 console.log(post);

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
        <h3>{post.title}</h3>
        <p> {post.body}</p>
      </div>
    )
  }
  
}