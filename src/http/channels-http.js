import http from "./http-configuration";

const channelsHttp = {
  // endpoints to node

  createChannel: async (serverId, channel) => {
    const { data } = await http.post(`/channels/${serverId}`, {
      channel,
    });
    return data;
  },


  createDirectMessage: async (channel) => {
    const { data } = await http.post(`/channels`, {
      channel,
    });
    return data;
  },

  getDirectMessages: async (channelId) => {
    const { data } = await http.get(`/channels/direct-messages`);
    return data;
  },

  getChannelMessages: async (channelId, page = 1, limit = 20) => {
    const { data } = await http.get(`/channels/${channelId}/messages?page=${page}&limit=${limit}`);
    return data;
  },

  createChannelMessage: async (channelId, message, isPreviousAuthor) => {
    const { data } = await http.post(`/channels/${channelId}/messages`, {
      message,
      isPreviousAuthor
    });
    return data;
  },
  setTyping: async (channelId) => {
     await http.post(`/channels/${channelId}/typing`)
  },
};

export default channelsHttp;
