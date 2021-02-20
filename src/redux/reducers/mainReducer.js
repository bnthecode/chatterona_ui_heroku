const initialState = {
  servers: [],
  serverId: "",
  channelId: "",
};

// this reducer handles state used my <Main />
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVERS": {
      return {
        ...state,
        servers: action.payload,
      };
    }

    case "SET_SERVER_ID": {
      return {
        ...state,
        serverId: action.payload,
      };
    }
    case "SET_CHANNEL_ID": {
      return {
        ...state,
        channelId: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default mainReducer;
