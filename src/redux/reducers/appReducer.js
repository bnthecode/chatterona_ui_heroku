const initialState = {
  mobileView: false,
  servers: [],
  serverId: "",
  channels: [],
  channelId: "",
  messages: [],
  users: [],
  friends: [],
  directMessages: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // servers

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

    // channels
    case "SET_CHANNELS": {
      return {
        ...state,
        channels: action.payload,
      };
    }
    case "SET_CHANNEL_ID": {
      return {
        ...state,
        channelId: action.payload,
      };
    }
    case "SET_CHANNEL_MESSAGES": {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case "SET_SERVER_USERS": {
      return {
        ...state,
        users: action.payload,
      };
    }

    case "SET_USER_FRIENDS": {
      return {
        ...state,
        friends: action.payload,
      };
    }

    case "SET_DIRECT_MESSAGES": {
      return {
        ...state,
        directMessages: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
