import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import postReducer from "./postReducer";

const allReducer = combineReducers({
  authorReducer,
  postReducer
});

export default allReducer;
