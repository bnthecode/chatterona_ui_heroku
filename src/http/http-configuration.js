import axios from "axios";
import config from "../config";
import history from "../redux/history";
import store from "../redux/store";

const { auth } = store.getState();
const { node_api_base_url } = config;
const token = auth.user ? auth.user.token : "";
const httpConfig = axios.create({
  timeout: 10000,
  withCredentials: true,
});

httpConfig.interceptors.request.use((req) => {
  req.baseURL = node_api_base_url;

  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${token}`,
  };
  return req;
});

httpConfig.interceptors.response.use(
  function (successRes) {
    return successRes;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch({ type: "SET_AUTH_USER", payload: {} });
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default httpConfig;
