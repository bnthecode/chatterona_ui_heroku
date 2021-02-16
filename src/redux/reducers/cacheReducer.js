const initialState = {
  messages: [],
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {


    case "SET_CACHED_MESSAGES": {
      return {
        ...state,
        messages: {
          ...state.messages,
          ...action.payload,
        }
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default cacheReducer;
