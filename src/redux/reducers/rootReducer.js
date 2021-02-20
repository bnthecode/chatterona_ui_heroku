import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import history from "../history";
import mainReducer from "./mainReducer";
import serverReducer from "./serverReducer";
import connectionsReducer from "./connectionsReducer";

const persistConfig = {
  key: "chatteroni",
  storage,
  whitelist: ["auth"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  // whitelist: ['user']
};

const mainPersistConfig = {
  key: "main",
  storage: storage,
  whitelist: ["serverId", "channelId", "channels"],
};

const rootReducer = (history) =>
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    main: persistReducer(mainPersistConfig, mainReducer),
    server: serverReducer,
    connections: connectionsReducer,
    router: connectRouter(history),
  });

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default persistedReducer;
