import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import history from './history';
import { routerMiddleware } from "connected-react-router";
import persistStore from "redux-persist/es/persistStore";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);

export const persistor = persistStore(store);

export default store;
