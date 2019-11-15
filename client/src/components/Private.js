import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  console.log("...rest", rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
      localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to='/'
          />
        )
      }
    />
  );
}
