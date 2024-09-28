import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => <div className="main content notFound">
    <Link className="logo" to="/"></Link>
    <div className="title">404</div>
    <p>Not found</p>
</div>