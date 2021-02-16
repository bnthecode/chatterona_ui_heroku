import appReducer from "./appReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import cacheReducer from "./cacheReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import history from '../history';

const persistConfig = {
  key: "chatteroni",
  storage,
  whitelist: ['auth']
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  // whitelist: ['user']
}




const rootReducer = (history) =>
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    app: appReducer,
    router: connectRouter(history),
    cache: cacheReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default persistedReducer;
