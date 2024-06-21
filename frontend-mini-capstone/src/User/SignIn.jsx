export function SignIn(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.login(params);
  };

  return (
    <div className="signIn">
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit} id="signinForm">
        <label> Email: <input name="email" type="email"/> </label>
        <label> Password: <input name="password" type="password"/> </label>
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}