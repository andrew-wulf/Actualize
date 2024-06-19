import { useState } from "react";


export function SignUp(props) {

  const [errors, setErrors] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    
    let pass = params.get('password');
    let pass2 = params.get('password');
    let first = params.get('first');
    let last = params.get('last');

    setErrors("Invalid Inputs detected. Please try again.")

    if (pass === pass2) {
      if (pass.length > 4) {
        if (first.length > 0 && last.length > 0) {
          setErrors("");
          props.signup(params);
        }
      }
    }
  }

  return (
    <div className="signUp">
      <h1>Sign Up</h1>
      
      <form onSubmit={handleSubmit} id="signupForm">
        <p>{errors}</p>

        <label> First Name: <input name="first" type="text"/> </label>
        <label> Last Name: <input name="last" type="text"/> </label>
        <label> Email: <input name="email" type="email"/> </label>
        <label> Password: <input name="password" type="password"/> </label>
        <label> Confirm Password: <input name="password_confirmation" type="password"/> </label>
        <button type="submit">Submit</button>

      </form>

    </div>
  )
}