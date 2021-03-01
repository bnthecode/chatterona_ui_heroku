const initialState = {
  servers: [],
  serverId: "",
  channelId: "",
  channel: "",
  serverUsers: [],
  tempServer: null,
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

    case "SET_CHANNEL": {
      return {
        ...state,
        channel: action.payload,
      };
    }

    case "SET_SERVER_USERS" : {
      return {
        ...state,
        serverUsers: action.payload,
      };
    }
    case "SET_TEMP_SERVER": {
      return {
        ...state,
        tempServer: action.payload,
      };
    }


    default:
      return {
        ...state,
      };
  }
};

export default mainReducer;
