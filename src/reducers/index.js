import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";

// NOTE: on startup all the reducers run with some random default action
export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});
