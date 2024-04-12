import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./Messages";
import auth from "./Auth";
import user from "./user";

export default combineReducers({
  errors,
  messages,
  auth,
  user,
});
