export const setCachedMessagesRedux = (dispatch) => (channelId, messages) => {
  const messageMap = {
    [channelId]: messages
  }

  dispatch({ type: "SET_CACHED_MESSAGES", payload: messageMap });
};

