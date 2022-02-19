import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function Profile() {
    let { id } = useParams()
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const [listOfPostsById, setlistOfPostsById] = useState([])
    useEffect(() => {
        axios.get(
            `http://localhost:3301/auth/basicinfo/${id}`
        ).then((response) => {
            setUsername(response.data.username)
        })
        axios.get(
            `http://localhost:3301/posts/byuid/${id}`
        ).then((response) => {
            setlistOfPostsById(response.data)
        })
    }, [])
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username}</h1>
            </div>
            <div className="listOfPosts">
                {listOfPostsById.map((value, key) => {
                    return (
                        <div className="post" key={value.title}>
                            <div className="title">{value.title}</div>
                            <div className="body" onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                            <div className="footer">
                                {value.username}
                                <label> Like: {value.Likes.length}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
