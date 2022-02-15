import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const login = () => {
        const data = {
            username,
            password
        }
        axios.post("http://localhost:3301/auth/login", data).then((res) => {
            console.log(res.data)
            if (res.data.error) alert(res.data.error)
            else {
                sessionStorage.setItem("accessToken", res.data)
                navigate('/')
            }
        })
    }
    return (
        <div>
            <input type="text" onChange={(event) => { setUsername(event.target.value) }} />
            <input type="password" onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={login}>Login</button>
        </div>
    )
}
