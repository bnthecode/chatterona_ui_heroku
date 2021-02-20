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

  getUserFriends: async () => {
    const { data } = await http.get(`/users/friends`);
    return data;
  },

  subscribeToNotifications: async (subscription) => {
    const { data } = await http.post("/users/notifications/register", {
      subscription,
    });
    return data;
  },

  unsubscribeToNotifications: async () => {
    const { data } = await http.delete("/users/notifications/unregister");
    return data;
  },
};

export default usersHttp;
