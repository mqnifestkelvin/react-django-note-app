import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { logout } from "../Actions/Auth";
import "../pages/css/login.css";

const Header = ({ isAuthenticated, logout }) => {
  const location = useLocation();
  // const navigate = useNavigate();

  let headerText = "My Notes";
  if (location.pathname === "/") {
    headerText = "Log in to Account";
  } else if (location.pathname === "/register") {
    headerText = "Register Account";
  } else if (location.pathname === "/password-reset") {
    headerText = "Reset Password";
  } else if (location.pathname.startsWith("/confirm-password-reset/")) {
    headerText = "Confirm Password Reset";
  }

  const onLogoutClick = () => {
    logout();
    // navigate("/");
  };

  return (
    <div className="app-header">
      <Link to={"/"}>
        <h1>{headerText}</h1>
      </Link>
      {isAuthenticated && (
        <Link to={"/"}>
          <button className="logout-button" onClick={onLogoutClick}>
            Logout
          </button>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
