export function PostsIndex(props) {
  return (
    <div id="posts-index">
      <h1>{props.title}</h1>

      <div className="posts">
        {props.posts.map(
          function (post) {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                
                <div className="body">
                  <div>
                    <h3>{post.body}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloremque dolorem nihil placeat, pariatur ullam, qui excepturi rerum reprehenderit voluptates facere at id cumque. Cumque vel commodi suscipit veritatis rem!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ex soluta sunt illo, inventore sit facilis exercitationem? Adipisci, illum? Officiis facilis vero pariatur porro beatae quas exercitationem quidem amet necessitatibus!</p>
                  </div>
                
                  <img src={post.image}></img>
                </div>
              </div>
            );
          }
        )}
      </div>
      


    </div>
  );
}
