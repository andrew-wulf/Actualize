import { Link } from "react-router-dom";

export function Header() {
  return (
  <div className="header">
    <Link to="/">Home</Link> <Link to="/posts">All posts</Link> <Link to="/newpost">New post</Link> <Link to="/signup">Signup</Link>
  </div>
  )
}