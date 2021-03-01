import http from "./http-configuration";

const categoryHttp = {
  // endpoints to node

  addChannelToCategory: async (catergoryId, channel) => {
    const startTime = performance.now()
    const { data } = await http.put(`/categories/${catergoryId}/channels`, {
      channel,
    });
    const endTime = performance.now()
    console.log(
      `%c[API] add channel took ${endTime - startTime}ms`,
      "color:Orange"
    );
    return data;
  },
};

export default categoryHttp;
