import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { confirmPassword } from "../../../Actions/Auth";
import PasswordResetErrors from "../../../components/ErrorHandler";
import { withRouterHooks } from "../../withRouterHooks";
import TogglePasswordInput from "../../../components/ToggleConfirmPassword";
import "../../css/login.css";

class ConfirmPasswordReset extends Component {
  state = {
    password: "",
    confirm_password: "",
  };

  static propTypes = {
    confirmPassword: PropTypes.func.isRequired,
    error: PropTypes.object,
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  // componentDidMount() {}

  onSubmit = (e) => {
    e.preventDefault();
    const { password, confirm_password } = this.state;
    const { navigate } = this.props;
    // Extract uidb64 and token from the URL
    const pathParts = this.props.location.pathname.split("/");
    const uidb64 = pathParts[pathParts.length - 3];
    const token = pathParts[pathParts.length - 2];

    // Dispatch the confirmPassword action
    this.props.confirmPassword(uidb64, token, password, confirm_password);

    // Navigate to a confirmation page or display a success message as needed
    navigate("/password-change-successful");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { error } = this.props;

    return (
      <div className="pass-word-reset-page">
        <PasswordResetErrors error={error} />
        <form onSubmit={this.onSubmit} className="login-form">
          <TogglePasswordInput
            password={this.state.password}
            confirmPassword={this.state.confirm_password}
            onPasswordChange={this.onChange}
            onConfirmPasswordChange={this.onChange}
          />
          <button className="button register-button" type="submit">
            Confirm
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.msg,
});

const mapDispatchToProps = { confirmPassword };

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordReset)
);
