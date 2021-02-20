export const setUserFriendsRedux = (dispatch) => (friends) => {
  dispatch({ type: "SET_USER_FRIENDS", payload: friends });
};

export const setDirectMessagesRedux = (dispatch) => (directMessages) => {
  dispatch({ type: "SET_DIRECT_MESSAGES", payload: directMessages });
};

export const setConnectionsChannelIdRedux = (dispatch) => (channelId) => {
  dispatch({ type: "SET_CONNECTIONS_CHANNEL_ID", payload: channelId });
};

export const setConnectionsChannelsRedux = (dispatch) => (channels) => {
  dispatch({ type: "SET_CONNECTIONS_CHANNELS", payload: channels });
};
