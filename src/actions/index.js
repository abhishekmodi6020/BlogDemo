import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("Aboout to fetch posts");
  await dispatch(fetchPosts());
  console.log(getState().posts);
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  console.log(userIds);
  userIds.forEach(id => dispatch(fetchUser(id)));
};

// Arguments DISPATCH and getState, gives power to thunk todo many things
// Currently argument 2... getState is not required therefore we remove it
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get("/posts");
  // // NOW WE CANNOT RETURN AN ACTION. THERSFORE USE DISPATCH
  // return {type: "FETCH_POST",payload: response };
  dispatch({ type: "FETCH_POST", payload: response.data });
};

// Passing the ID of the user we want to fetch
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// // Passing the ID of the user we want to fetch
// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };
// // Fetching id with memoize
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// // Breaking rules of redux..

// export const fetchPosts = async () => {
//   const response = await jsonPlaceHolder.get("/posts");
//   return {
//     type: "FETCH_POST",
//     payload: response
//   };
// };
