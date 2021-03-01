export const setPublicServersRedux = (dispatch) => (servers) => {
    dispatch({ type: "SET_PUBLIC_SERVERS", payload: servers });
  };
  