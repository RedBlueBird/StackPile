import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import User from "./pages/user.jsx";

// https://paste.mod.gg/romilolige.js

export default function App(){
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </ Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/user/:userid" component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};
