import React from 'react'
import { Link } from "react-router-dom"
export default function PageNotFound() {
    return (
        <div>
            <h1>PageNotFound</h1>
            <h3>try this link : <Link to="/">Home Page</Link></h3>
        </div>


    )
}
