import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./App.scss";
import "photoswipe/dist/photoswipe.css";

import { Odvodo } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import { Layout } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotFound } from "./components";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/map/:list?/:all?" element={<Odvodo />} />
          <Route path="/:category?/:entry?" element={<Layout />} />
          <Route
            path="*"
            element={
              <div className="App">
                <NotFound marginLeft={0} />
              </div>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
serviceWorker.register();
