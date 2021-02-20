import Voice from "./Voice";

class WebsocketService extends Voice {
  userStream = {};
  connection = new WebSocket("ws://localhost:5000");
  connectedChannelId = "";
  connectionsOpen = {};

  initializeWebsocket = (callback) => {
    this.connection.addEventListener("open", () => {});

    this.connection.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "create-offer") {
        await this.handleWebsocketCreateOffer(data);
      }
      if (data.type === "create-answer") {
        await this.handleWebsocketOtherPersonAnswered(data);
      }
      callback(data);
    };
  };

  connectVoice = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    await this.establishPeer(this.channelId, this.connection, stream);

    this.connection.send(
      JSON.stringify({
        type: "join-voice",
        channelId: this.connectedChannelId,
      })
    );
  };

  handleWebsocketCreateOffer = async (data) => {
    await this.createRemotePeer(this.channelId, data.offer, this.connection);
    // do i set the track shit here????
  };

  handleWebsocketOtherPersonAnswered = async (data) => {
    await this.setRemoteAnswer(data.answer);
  };

  joinChannel = (channelId) => {
    this.connection.send(
      JSON.stringify({
        type: "join-channel",
        channelId,
      })
    );
    this.connectionsOpen = {
      ...this.connectionsOpen,
      [channelId]: true,
    };

    this.connectedChannelId = channelId;
  };
  sendMessage = (channelId, message, merge) => {
    this.connection.send(
      JSON.stringify({
        type: "send-message",
        message: { ...message, merge: merge },
        channelId: this.connectedChannelId,
      })
    );
  };
}

export default WebsocketService;
