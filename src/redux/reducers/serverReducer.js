const initialState = {
  channelId: "",
  channels: [],
  serverUsers: [],
};

// this reducer handles all state used by <Server />
const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVER_USERS": {
      return {
        ...state,
        serverUsers: action.payload,
      };
    }
    case "SET_SERVER_CHANNEL_ID": {
      return {
        ...state,
        serverUsers: action.payload,
      };
    }
    case "SET_SERVER_CHANNELS": {
      return {
        ...state,
        serverUsers: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default serverReducer;
