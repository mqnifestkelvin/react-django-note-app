import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/login.css";
import { resetpassword } from "../../../Actions/Auth";
import PasswordResetErrors from "../../../components/ErrorHandler";
import { Link, Navigate } from "react-router-dom";
import { withRouterHooks } from "../../withRouterHooks";

class PasswordReset extends Component {
  state = {
    email: "",
    message: "",
  };

  static propTypes = {
    resetpassword: PropTypes.func.isRequired,
    error: PropTypes.object,
    navigate: PropTypes.func.isRequired,
    isSent: PropTypes.bool,
  };

  onSubmit = (e) => {
    const { navigate } = this.props;
    e.preventDefault();
    this.props.resetpassword(this.state.email);
    navigate("/password-reset-sent");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, message } = this.state;
    const { error } = this.props;

    return (
      <div className="login-page">
        {message && <div>{message}</div>}
        <PasswordResetErrors error={error} />{" "}
        {/* Render the errors component */}
        <form onSubmit={this.onSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <br />
        <Link to={"/"}>Back to login</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.status,
});

const mapDispatchToProps = { resetpassword };

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
);
