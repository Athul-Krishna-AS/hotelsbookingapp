import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/LoginSignup";
import AdminHome from "./pages/adminhome/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/hotels" element={<List/>}></Route>
        <Route path ="/hotelsearch" element={<Hotel/>}></Route>
        <Route path ="/login" element={<Login/>}></Route>
        <Route path ="/adminhome" element={<AdminHome/>}></Route>
        </Routes>   
    </BrowserRouter>
  );
}

export default App;
