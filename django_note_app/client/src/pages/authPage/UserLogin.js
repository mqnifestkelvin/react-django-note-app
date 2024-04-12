// LogInPage.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../Actions/Auth";
import PasswordResetErrors from "../../components/ErrorHandler";
import PasswordInput from "../../components/TogglePassword";
import "../css/login.css";

class LogInPage extends Component {
  state = {
    email: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
  };

  componentDidMount() {
    this.setState({
      email: "",
      password: "",
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/notes" />;
    }

    const { email, password } = this.state;

    return (
      <div className="login-page">
        <PasswordResetErrors error={this.props.error} />
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
          <PasswordInput value={password} onChange={this.onChange} />
          <button className="button" type="submit">
            Log In
          </button>
        </form>
        <br />
        <Link to="/register">Don't Have an Account?</Link>
        <Link to={"/password-reset"}>Forgot Password?</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors.msg,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
