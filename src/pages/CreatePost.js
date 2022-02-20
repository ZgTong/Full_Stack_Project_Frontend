import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Authcontext } from "../helpers/AuthContext"
function CreatePost(props) {
    const { authState } = useContext(Authcontext)
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        }
    }, [])
    const initialValues = {
        title: "",
        postText: ""
    }
    const onSubmit = (data) => {
        console.log(data)
        axios.post(
            "http://tzg-first-full-stack-api.herokuapp.com/posts",
            data,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        ).then((response) => {
            console.log(response)
            navigate(`/`)
        })
    }
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    })
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Example: title" />

                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Example: text" />

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

CreatePost.propTypes = {}

export default CreatePost
