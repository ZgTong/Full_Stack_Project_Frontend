import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="createpost">Add a post</Link>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createpost" exact element={<CreatePost/>}/>
          <Route path="/post/:id" exact element={<Post/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
