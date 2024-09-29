import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/:list?">
          <App />
        </Route>
      </Routes>
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
