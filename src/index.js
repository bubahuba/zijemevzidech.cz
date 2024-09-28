import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./App.scss";
import 'photoswipe/dist/photoswipe.css'

import Odvodo from "./Odvodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { Layout } from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/odvodo/:list?" element={<Odvodo />} />
      <Route path="/:category?/:entry?" element={<Layout />}/>
    </Routes>
  </Router>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
