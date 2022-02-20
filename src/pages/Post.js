import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import axios from "axios"
import { Authcontext } from "../helpers/AuthContext"
import { useNavigate } from "react-router-dom"
function Post(props) {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { authState } = useContext(Authcontext)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://tzg-first-full-stack-api.herokuapp.com/posts/byId/${id}`).then((response) => {

            setPostObject(response.data)
        })

        axios.get(`https://tzg-first-full-stack-api.herokuapp.com/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [])

    const addComment = () => {
        axios.post(
            `https://tzg-first-full-stack-api.herokuapp.com/comments`,
            {
                commentBody: newComment,
                PostId: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                const commentToAdd = {
                    commentBody: res.data.commentBody,
                    username: res.data.username,
                    id: res.data.id
                }
                setComments([...comments, commentToAdd])
                setNewComment("")
            }

        })
    }

    const deleteComment = (id) => {
        axios.delete(
            `https://tzg-first-full-stack-api.herokuapp.com/comments/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then(() => {
            setComments(comments.filter((val, idx, arr) => {
                return val.id != id
            }))
        })
    }

    const deletePost = (id) => {
        axios.delete(
            `https://tzg-first-full-stack-api.herokuapp.com/posts/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then(() => {
            console.log("delete successfully")
            navigate("/")
        })
    }

    return (
        <div>
            <div className="leftSide">
                <div>{postObject.title}</div>
                <div>{postObject.postText}</div>
                <div>
                    {postObject.username}
                    {
                        authState.username === postObject.username && (
                            <button onClick={() => { deletePost(postObject.id) }}> Delete </button>
                        )
                    }
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" value={newComment} placeholder="Comment:" onChange={(e) => { setNewComment(e.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComment">
                    {
                        comments.map((comment, key) => {
                            return <div className="comment" key={key}>
                                {comment.commentBody}
                                <label>Author: {comment.username}</label>
                                {
                                    authState.username === comment.username && (
                                        <button onClick={() => { deleteComment(comment.id) }}> X</button>
                                    )

                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div >

    )
}

Post.propTypes = {}

export default Post
