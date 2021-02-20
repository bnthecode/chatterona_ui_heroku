const initialState = {
  channelId: "",
  channels: [],
  directMessages: [],
};

// this reducer handles all state used by <Connections />
const connectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DIRECT_MESSAGES": {
      return {
        ...state,
        directMessages: action.payload,
      };
    }
    case "SET_CONNECTIONS_CHANNEL_ID": {
      return {
        ...state,
        channelId: action.payload,
      };
    }
    case "SET_CONNECTIONS_CHANNELS": {
      return {
        ...state,
        channels: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default connectionsReducer;
