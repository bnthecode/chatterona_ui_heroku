export const setServersRedux = (dispatch) => (servers) => {
  dispatch({ type: "SET_SERVERS", payload: servers });
};

export const setChannelsRedux = (dispatch) => (channels) => {
  dispatch({ type: "SET_CHANNELS", payload: channels });
};

export const setServerIdRedux = (dispatch) => (server) => {
  dispatch({ type: "SET_SERVER_ID", payload: server });
};

export const setChannelIdRedux = (dispatch) => (channel) => {
  dispatch({ type: "SET_CHANNEL_ID", payload: channel });
};

export const setChannelMessagesRedux = (dispatch) => (messages) => {
  dispatch({ type: "SET_CHANNEL_MESSAGES", payload: messages });
};

export const setServerUsersRedux = (dispatch) => (users) => {
  dispatch({ type: "SET_SERVER_USERS", payload: users });
};

export const setUserFriendsRedux = (dispatch) => (friends) => {
  dispatch({ type: "SET_USER_FRIENDS", payload: friends });
};

export const setDirectMessagesRedux = (dispatch) => (directMessages) => {
  dispatch({ type: "SET_DIRECT_MESSAGES", payload: directMessages });
};
