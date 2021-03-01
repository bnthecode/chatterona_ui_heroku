export const updateHeaderFilterRedux = (dispatch) => (filter) => {
    dispatch({ type: "UPDATE_HEADER_FILTER", payload: filter });
  };
  