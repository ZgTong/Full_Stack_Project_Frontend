import React from 'react'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Authcontext } from "../helpers/AuthContext"
function Home() {
    const [listOfPosts, setListOfPost] = useState([])
    const navigate = useNavigate()
    const { authState } = useContext(Authcontext)
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        } else {
            axios.get(
                "http://localhost:3301/posts", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
            ).then((response) => {
                console.log(response.data)
                setListOfPost(response.data)
            })
        }
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
                    if (res.data.liked) return { ...post, Likes: [...post.Likes, 0] }
                    else {
                        const likesArr = post.Likes
                        likesArr.pop()
                        return { ...post, Likes: likesArr }
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
                            <Link to={`/profile/${value.id}`}>{value.username}</Link>
                            <button onClick={() => {
                                likeAPost(value.UserId)
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