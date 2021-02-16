export const setAuthUserRedux = (dispatch) => (user) => {
    dispatch({ type: 'SET_AUTH_USER', payload: user})
}