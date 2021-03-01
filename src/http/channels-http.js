import http from "./http-configuration";

const channelsHttp = {
  // endpoints to node

  createChannel: async (serverId, channel) => {
    const startTime = performance.now()
    const { data } = await http.post(`/channels/${serverId}`, {
      channel,
    });
    const endTime = performance.now()
    console.log(
      `%c[API] create channel took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
    
  },

  createDirectMessage: async (channel) => {
    const startTime = performance.now()

    const { data } = await http.post(`/channels`, {
      channel,
    });
    const endTime = performance.now()
    console.log(
      `%c[API] create direct messages took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  getDirectMessages: async (channelId) => {
    const startTime = performance.now()
    const { data } = await http.get(`/channels/direct-messages`);
    const endTime = performance.now()
    console.log(
      `%c[API] get direct messages took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  getChannelMessages: async (channelId) => {
    const startTime = performance.now()
    const { data } = await http.get(`/channels/${channelId}/messages`);
    const endTime = performance.now()
    console.log(
      `%c[API] get channel messages took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },

  createChannelMessage: async (channelId, message, isPreviousAuthor) => {
    const startTime = performance.now()
    const { data } = await http.post(`/channels/${channelId}/messages`, {
      message,
      isPreviousAuthor,
    });
    const endTime = performance.now()
    console.log(
      `%c[API] create message took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },
  setTyping: async (channelId) => {
    await http.post(`/channels/${channelId}/typing`);
  },
};

export default channelsHttp;
