import { SignIn } from "./SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import { Timeline } from "./Timeline.jsx";
import { Redirect } from "./Redirect.jsx";


export function Content(props) {
  let user = props.user;

  return (
    <div className="content">
      <Routes>
        <Route path="/" element= {<Redirect user={user} setUser={props.setUser}/>}/>
        <Route path="/signin" element={<SignIn user={user}/>}/>

        <Route path = "/home" element={<Timeline user={user}/>}/>

      </Routes>
    </div>
  )
}