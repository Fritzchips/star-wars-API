import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingScreen() {
  return (
    <div>
      <Spinner animation="grow" variant="warning" /> Using the force to retrieve
      Galactic Knowledge ...
    </div>
  );
}

export default LoadingScreen;
