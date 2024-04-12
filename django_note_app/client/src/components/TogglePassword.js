// PasswordInput.js
import HideIcon from "../assets/icons/hide.png";
import ViewIcon from "../assets/icons/view.png";
import React, { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group password-input-group">
      <label htmlFor="password">Password:</label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={value}
        onChange={onChange}
        required
      />
      <button
        className="show-password-button"
        type="button" // Prevent form submission
        onClick={toggleShowPassword}
      >
        {" "}
        {showPassword ? (
          <img
            className="show-password-button-click"
            src={HideIcon}
            alt="Hide"
          />
        ) : (
          <img
            className="show-password-button-click"
            src={ViewIcon}
            alt="View"
          />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
