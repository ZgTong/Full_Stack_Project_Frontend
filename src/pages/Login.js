import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Authcontext } from "../helpers/AuthContext"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(Authcontext)
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
                localStorage.setItem("accessToken", res.data.accessToken)
                setAuthState({
                    username: res.data.username,
                    id: res.data.id,
                    status: true
                })
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
