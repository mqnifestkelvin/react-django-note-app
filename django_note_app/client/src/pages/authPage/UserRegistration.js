import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../Actions/Auth";
import "../css/login.css";
import PasswordResetErrors from "../../components/ErrorHandler";
import TogglePasswordInput from "../../components/ToggleConfirmPassword";

class UserRegistration extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    // error: PropTypes.object,
  };

  componentDidMount() {
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      //  error: "",
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.confirm_password) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    this.props.register(
      this.state.first_name,
      this.state.last_name,
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.confirm_password
    );
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/notes" />;
    }

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password,
      //  error,
    } = this.state;

    return (
      <div className="registration-page">
        <PasswordResetErrors error={this.props.error} />
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={first_name}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.onChange}
              required
            />
          </div>
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
          <div className="input-group"></div>
          <div className="input-group">
            <TogglePasswordInput
              password={this.state.password}
              confirmPassword={this.state.confirm_password}
              onPasswordChange={this.onChange}
              onConfirmPasswordChange={this.onChange}
            />
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <Link to="/">Have an Account?</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors.msg,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
