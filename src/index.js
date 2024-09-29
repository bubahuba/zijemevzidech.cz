import React from "react";
import {createRoot} from "react-dom/client";
import "./index.scss";
import "./App.scss";
import 'photoswipe/dist/photoswipe.css'

import Odvodo from "./Odvodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { Layout } from "./components/Layout";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/odvodo/:list?" element={<Odvodo />} />
      <Route path="/:category?/:entry?" element={<Layout />}/>
    </Routes>
  </Router>
);
serviceWorker.register();
