import React from "react";
import PropTypes from "prop-types";

const PasswordResetErrors = ({ error }) => {
  const renderErrors = () => {
    if (error && typeof error === "object") {
      return Object.keys(error).flatMap((key) =>
        key === "detail" && error[key] === "Invalid token." ? (
          []
        ) : Array.isArray(error[key]) ? (
          error[key].flatMap((message, index) =>
            message === "Invalid token." ? null : (
              <p
                key={`${key}-${index}`}
                className="error"
                style={{ color: "red" }}
              >
                {`${key}: ${message}`}
              </p>
            )
          )
        ) : (
          <p key={key} className="error" style={{ color: "red" }}>
            {`${key}: ${error[key]}`}
          </p>
        )
      );
    }
    return null;
  };

  return <div>{renderErrors()}</div>;
};

PasswordResetErrors.propTypes = {
  error: PropTypes.object,
};

export default PasswordResetErrors;
