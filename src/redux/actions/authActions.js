export const setAuthUserRedux = (dispatch) => (user) => {
  dispatch({ type: "SET_AUTH_USER", payload: user });
};

export const setUserFriendsRedux = (dispatch) => (friends) => {
  dispatch({ type: "SET_USER_FRIENDS", payload: friends });
};
