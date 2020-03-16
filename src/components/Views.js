import { Route, Redirect } from "react-router-dom";
import React from "react";
import Pedalboard from "./board/Pedalboard";

const Views = props => {
  return (
    <>
      <Route
        path="/board"
        render={props => {
          return <Pedalboard {...props} />;
        }}
      />
    </>
  );
};

export default Views