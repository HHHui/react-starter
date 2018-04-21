import { combineReducers } from "redux";
import counterReducer from "./counter";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  counter: counterReducer,
  router: routerReducer
});
