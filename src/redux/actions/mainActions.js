export const setServersRedux = (dispatch) => (servers) => {
    dispatch({ type: 'SET_SERVERS', payload: servers})
}

export const setServerIdRedux = (dispatch) => (server) => {
    dispatch({ type: 'SET_SERVER_ID', payload: server})
}

export const setChannelIdRedux = (dispatch) => (channelId) => {
    dispatch({ type: 'SET_CHANNEL_ID', payload: channelId})
}
