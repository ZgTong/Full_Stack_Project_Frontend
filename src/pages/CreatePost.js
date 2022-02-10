import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CreatePost(props) {
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3301/posts",data).then((response) => {
            console.log(response)
            navigate(`/`)
        })
    }
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    })
    return (
        <div className="createPostPage">
            <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Example: title" />

                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Example: text" />
                    <label>Username: </label>

                    <Field id="inputCreatePost" name="username" placeholder="Example: username" />
                    <ErrorMessage name="username" component="span" />
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

CreatePost.propTypes = {}

export default CreatePost
