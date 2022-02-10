import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom"
import axios from "axios"
function Post(props) {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3301/posts/byId/${id}`).then((response) => {
            console.log(response)
            setPostObject(response.data)
        })
    }, [])
    return (
        <div>
            <div className="leftSide">
                <div>{postObject.title}</div>
                <div>{postObject.postText}</div>
                <div>{postObject.username}</div>
            </div>
            <div className="rightSide">
                <div className="comment">
                    
                </div>
            </div>
        </div>

    )
}

Post.propTypes = {}

export default Post
