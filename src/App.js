import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./pages/Profile"
import { Authcontext } from "../src/helpers/AuthContext"
import { useState, useEffect } from "react"
import axios from 'axios';
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })
  useEffect(() => {

    axios.get("http://localhost:3301/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      if (res.data.error) setAuthState({
        ...authState,
        status: false
      })
      else setAuthState({
        username: res.data.username,
        id: res.data.id,
        status: true
      })
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({
      username: "",
      id: 0,
      status: false
    })
  }

  return (
    <div className="App">
      <Authcontext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>

          {
            !authState.status ? (
              <>
                <Link to="/login">Login </Link>
                <Link to="/registration">Registration </Link>
              </>
            ) :
              (
                <>                  
                  <Link to="createpost">Add a post </Link>
                  <Link to="/">Home </Link>
                  <button onClick={logout}>Logout</button>
                </>

              )

          }
          <h3>{authState.username}</h3>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />\
            <Route path="/profile/:id" exact element={<Profile />} />\
            <Route path="/*" exact element={<PageNotFound />} />\

          </Routes>
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
