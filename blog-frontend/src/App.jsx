import { Header } from "./Header"
import { Footer } from "./Footer.1"
import { Content } from "./Content"
import { BrowserRouter } from "react-router-dom";
  


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;