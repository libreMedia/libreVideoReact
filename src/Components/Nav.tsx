import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Rando from '../Pages/RandoVid'
import Home from '../Pages/Home'

export default function Nav() {
    return (
      <Router>
        <div>
            
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rando">Random Thot</Link>
            </li>
          </ul>
  
          <hr />
  
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Rando">
              <Rando />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }