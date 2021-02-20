const initialState = {
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "SET_USER_FRIENDS": {
      return {
        ...state,
        user: {
          ...state.user,
          friends: action.payload,
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
