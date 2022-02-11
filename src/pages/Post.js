import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import axios from "axios"
function Post(props) {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:3301/posts/byId/${id}`).then((response) => {
            console.log(response)
            setPostObject(response.data)
        })

        axios.get(`http://localhost:3301/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [])

    const addComment = () => {
        axios.post(`http://localhost:3301/comments`, { commentBody: newComment, PostId: id }).then((res) => {
            const commentToAdd = { commentBody: newComment }
            setComments([...comments, commentToAdd])
            setNewComment("")
        })
    }
    return (
        <div>
            <div className="leftSide">
                <div>{postObject.title}</div>
                <div>{postObject.postText}</div>
                <div>{postObject.username}</div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" value={newComment} placeholder="Comment:" onChange={(e) => { setNewComment(e.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComment">
                    {
                        comments.map((comment, key) => {
                            return <div className="comment" key={key}>{comment.commentBody}</div>
                        })
                    }
                </div>
            </div>
        </div>

    )
}

Post.propTypes = {}

export default Post
