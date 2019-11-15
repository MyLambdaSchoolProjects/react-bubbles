import React from "react";
import { Route, Redirect } from "react-router-dom";


export default function PrivateRoute({ component: Component, ...rest }) {
  console.log("...rest", rest);
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("token") ? <Component /> : <Redirect to="/" />
      }
    />
  );
}
