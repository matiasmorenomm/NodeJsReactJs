import React from "react";
import Register from './components/register';
import Login from './components/login';
import Libros from './components/table';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/registro">
            <Register/>
          </Route>
          <Route path="/libros">
            <Libros/>
          </Route>
        </Switch>
    </Router>
    
  );
}
