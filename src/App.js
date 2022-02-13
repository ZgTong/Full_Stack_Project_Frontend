import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="createpost">Add a post</Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createpost" exact element={<CreatePost/>}/>
          <Route path="/post/:id" exact element={<Post/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/login" exact element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
