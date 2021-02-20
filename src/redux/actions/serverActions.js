export const setServerUsersRedux = (dispatch) => (users) => {
    dispatch({ type: 'SET_SERVER_USERS', payload: users})
}

export const setServerChannelIdRedux = (dispatch) => (channelId) => {
    dispatch({ type: 'SET_SERVER_CHANNEL_ID', payload: channelId})
}

export const setServerChannelsRedux = (dispatch) => (channels) => {
    dispatch({ type: 'SET_SERVER_CHANNELS', payload: channels})
}
