import axios from "axios";
import { returnErrors } from "./Messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_SUCCESS,
} from "./Types";

// LOGIN USER
export const login = (email, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("/auth/user/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register =
  (first_name, last_name, username, email, password, confirm_password) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password,
    });

    axios
      .post("/auth/user/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .get(`/auth/user/logout`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// RESET PASSWORD
export const resetpassword = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email });

  axios
    .post("/auth/user/password-reset", body, config)
    .then((res) => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_RESET_FAILED,
      });
    });
};

// CONFIRM PASSWORD RESET
export const confirmPassword =
  (uidb64, token, password, confirm_password) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ password, confirm_password });

    axios
      .post(
        `/auth/user/password-reset-confirm/${uidb64}/${token}/`,
        body,
        config
      )
      .then((res) => {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: PASSWORD_RESET_FAILED,
        });
      });
  };

// Refresh token
export const refreshToken = () => (dispatch, getState) => {
  // Headers
  const config = tokenConfig(getState);

  axios
    .post("/auth/token/refresh", {}, config)
    .then((res) => {
      dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REFRESH_TOKEN_FAIL,
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
