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
import 'antd/dist/antd.css';
import { Menu, PageHeader  } from 'antd';
import { LogoutOutlined, LoginOutlined, PlusOutlined, HomeOutlined, CodeOutlined } from '@ant-design/icons';
function App() {
  const [navigation,setNavigation] = useState("home")
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })
  useEffect(() => {

    axios.get("https://tzg-first-full-stack-api.herokuapp.com/auth/auth", {
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

  const handleClick = (e) => {
    console.log('click ', e)
    setNavigation(e.key)
  };

  return (
    <div className="App">
      
      <Authcontext.Provider value={{ authState, setAuthState }}>
          
        <BrowserRouter>
          <Menu onClick={handleClick} selectedKeys={[navigation]} mode="horizontal">            
            {              
              !authState.status ? (
                <>
                  <Menu.Item key="login" icon={<LoginOutlined />}>
                    <Link to="/login">Login </Link>
                  </Menu.Item>
                  <Menu.Item key="registration" icon={<CodeOutlined />}>
                    <Link to="/registration">Registration </Link>
                  </Menu.Item>
                </>
              ) :
                (
                  <>                  
                    <Menu.Item key="createpost" icon={<PlusOutlined />} >
                      <Link to="/createpost">Add a post </Link>      
                    </Menu.Item>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                      <Link to="/">Home </Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                      Logout
                    </Menu.Item>
                  </>
                )
            }
          </Menu> 
          <PageHeader
            className="site-page-header"
            title={`User name: ${authState.username}`}
            subTitle="Start your social life now!"
          />,
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

