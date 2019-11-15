import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/Private";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
      <div className="App">
        <Switch>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path='/bubbles' component={BubblePage}/>
        </Switch>
      </div>
  );
}

export default App;
