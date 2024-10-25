import React from "react";
import { Link } from "react-router-dom";

export const NotFound = ({ marginLeft }) => <div className="main content notFound" style={marginLeft > -1 ? { marginLeft: marginLeft } : {}}>
    <Link className="logo" to="/"></Link>
    <div className="title">404</div>
    <p>Not found</p>
</div>