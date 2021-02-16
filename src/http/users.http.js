import http from "./http-configuration";

const usersHttp = {
  // endpoints to node

  createUser: async (user) => {
    const { data } = await http.post(`/users`, {
      user,
    });
    return data;
  },

  loginUser: async (user) => {

    const { data } = await http.put(`/users/login`, { user });
    return data;
  },
  logoutUser: async () => {
    const { data } = await http.put(`/users/logout`);
    return data;
  },
};

export default usersHttp;
