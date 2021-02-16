import http from "./http-configuration";

const serverService = {
  // endpoints to node
  getServers: async () => {
    const { data } = await http.get("/servers");
    return data;
  },
  getServer: async (serverId) => {
    const { data } = await http.get(`/servers/${serverId}`);
    return data;
  },

  getServerUsers: async (serverId) => {
    const { data } = await http.get(`/servers/${serverId}/users`);
    return data;
  },


  createServer: async (server) => {
    const { data } = await http.post("/servers", { server })
    return data;
  },
};

export default serverService;
