export function PostsIndex(props) {
  return (
    <div id="posts-index">
      <h1>{props.title}</h1>

      <div className="posts">
        {props.posts.map(
          function (post, i) {
            let bg = 'dark';
            if (i == 0 || i % 2 == 0) {
              bg = 'light';
            }
            return (
              <div key={post.id} name={bg}>
                <h2>{post.title}</h2>
                
                <div className="body">
                  <div>
                    
                    <p>{post.body}</p>

                  </div>
                
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEkqUCXEbnnT0SseSO2KfYlKzsL-TvxorVQ&s"></img>
                </div>
              </div>
            );
          }
        )}
      </div>
      


    </div>
  );
}
