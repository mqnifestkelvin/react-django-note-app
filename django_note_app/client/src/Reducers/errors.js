import { GET_ERRORS, PASSWORD_RESET_SUCCESS } from "../Actions/Types";

const initialState = {
  msg: {},
  status: null,
  isSent: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isSent: true,
      };
    default:
      return state;
  }
}
