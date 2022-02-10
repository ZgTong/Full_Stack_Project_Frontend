import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function Home() {
    const [listOfPosts, setListOfPost] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3301/posts").then((response) => {
            console.log(response.data)
            setListOfPost(response.data)
        })
    }, [])
    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" key={value.title} onClick={()=>{navigate(`/post/${value.id}`)}}>
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home