export const setServersRedux = (dispatch) => (servers) => {
  dispatch({ type: "SET_SERVERS", payload: servers });
};

export const setTempServerRedux = (dispatch) => (server) => {
  dispatch({ type: "SET_TEMP_SERVER", payload: server });
};


export const setServerIdRedux = (dispatch) => (server) => {
  dispatch({ type: "SET_SERVER_ID", payload: server });
};

export const setChannelIdRedux = (dispatch) => (channelId) => {
  dispatch({ type: "SET_CHANNEL_ID", payload: channelId });
};

export const setChannelRedux = (dispatch) => (channel) => {
  dispatch({ type: "SET_CHANNEL", payload: channel });
};

export const setServerUsersRedux = (dispatch) => (serverUsers) => {
  dispatch({ type: "SET_SERVER_USERS", payload: serverUsers });
};
