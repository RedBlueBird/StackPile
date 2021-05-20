import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Container from "react-bootstrap/Container";

import Navibar from "./components/navibar.jsx";
import Home from "./pages/home.jsx";
import User from "./pages/user.jsx";

// https://paste.mod.gg/romilolige.js

export default function App(){
  return (
    <BrowserRouter>
      <Container>
        <Navibar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </ Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/user/:userid" component={User} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
};
