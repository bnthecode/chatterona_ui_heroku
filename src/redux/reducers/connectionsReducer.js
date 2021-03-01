const initialState = {
    headerFilter: 'Online',
  };
  
  const connectionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_HEADER_FILTER": {
        return {
          ...state,
          headerFilter: action.payload,
        };
      }
  
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default connectionsReducer;
  