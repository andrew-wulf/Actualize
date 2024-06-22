import { SignIn } from "./SignIn.jsx";
import { Route, Routes } from "react-router-dom";


export function Content() {

  return (
    <div className="content">
      <Routes>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
    </div>
  )
}