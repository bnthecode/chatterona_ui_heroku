const initialState = {
    serverList: [],
  };
  
  const publicServersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PUBLIC_SERVERS": {
        return {
          ...state,
          serverList: action.payload,
        };
      }
  
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default publicServersReducer;
  