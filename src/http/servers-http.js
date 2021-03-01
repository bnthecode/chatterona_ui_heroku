import http from "./http-configuration";

const serverService = {
  // endpoints to node
  getServers: async () => {
    const startTime = performance.now()

    const { data } = await http.get("/servers");
    const endTime = performance.now()
    console.log(
      `%c[API] get servers took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },
  getServer: async (serverId) => {
    const startTime = performance.now()
    const { data } = await http.get(`/servers/${serverId}`);
    const endTime = performance.now()
    console.log(
      `%c[API] get server took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  getServerUsers: async (serverId) => {
    const startTime = performance.now()
    const { data } = await http.get(`/servers/${serverId}/users`);
    const endTime = performance.now()
    console.log(
      `%c[API] get server users took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  getServerCategories: async (serverId) => {
    const startTime = performance.now()

    const { data } = await http.get(`/servers/${serverId}/categories`);
    const endTime = performance.now()
    console.log(
      `%c[API] get server categories took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  getPublicServers: async () => {
    const startTime = performance.now()


    const { data } = await http.get(`/servers/public`);
    const endTime = performance.now()
    console.log(
      `%c[API] get public servers took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  createServer: async (server) => {
    const startTime = performance.now()

    const { data } = await http.post("/servers", { server });
    const endTime = performance.now()
    console.log(
      `%c[API] create server took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  addUserToServer: async (serverId, userId) => {
    const startTime = performance.now()

    const { data } = await http.put(`/servers/${serverId}/users`, { userId });
    const endTime = performance.now()
    console.log(
      `%c[API] add user to server took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },
};

export default serverService;

