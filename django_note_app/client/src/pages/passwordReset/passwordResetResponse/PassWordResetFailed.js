import React, { Component } from "react";
import { Link } from "react-router-dom";

export class PasswordResetFailed extends Component {
  render() {
    return (
      <div className="align-center">
        {/* <p>{message}</p> */}
        <h1>Password Reset Failed</h1>
        <Link to={"/password-reset"}>Back to Password Reset Click Here</Link>
      </div>
    );
  }
}

export default PasswordResetFailed;
