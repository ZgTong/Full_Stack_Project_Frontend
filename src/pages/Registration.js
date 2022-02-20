import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Registration() {
    const initialValues = {
        password: "",
        username: ""
    }
    const onSubmit = (data) => {
        console.log(data)
        axios.post("https://tzg-first-full-stack-api.herokuapp.com/auth", data).then((response) => {
            console.log(response)
        })
    }
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(4).max(20).required(),
        username: Yup.string().min(3).max(15).required(),
    })
    return (
        <div className="registrationPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>


                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreateUser" name="username" placeholder="Example: username" />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field id="inputCreateUser" type="password" name="password" placeholder="Example: password" />


                    <button type="submit">Registration</button>
                </Form>
            </Formik>
        </div>
    )
}
