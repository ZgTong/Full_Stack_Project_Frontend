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
    const likeAPost = (postId) => {
        axios.post(
            `http://localhost:3301/likes`,
            { PostId: postId },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then((res) => {
            setListOfPost(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (res.data.liked) return {...post, Likes: [...post.Likes, 0]}
                    else {
                        const likesArr = post.Likes
                        likesArr.pop()
                        return {...post, Likes: likesArr}
                    }
                } else {
                    return post
                }
            }))
        })
    }
    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" key={value.title}>
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                        <div className="footer">
                            {value.username}
                            <button onClick={() => {
                                likeAPost(value.id)
                            }}> Like </button>
                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home