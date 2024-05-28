export function PostsNew() {


  return (
    <div id="posts-new">
      <h1>New post</h1>
      <form>
        <label>
          Title: <input className="InputTitle" />
        </label>

        <label>
          Body: <input className="InputBody" />
        </label>

        <label>
          Image: <input className="InputImage" />
        </label>

        <div>
          <button>
            Submit!
          </button>
        </div>
      </form>
    </div>
  );
}
