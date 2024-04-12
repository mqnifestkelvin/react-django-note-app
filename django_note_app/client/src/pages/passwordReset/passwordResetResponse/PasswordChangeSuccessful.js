import React, { Component } from "react";
import { Link } from "react-router-dom";

export class PasswordChangedSuccessful extends Component {
  render() {
    return (
      <div className="align-center">
        {/* <p>{message}</p> */}
        <h1>Password Changed Successful</h1>
        <Link to={"/"}>Back to login</Link>
      </div>
    );
  }
}

export default PasswordChangedSuccessful;
