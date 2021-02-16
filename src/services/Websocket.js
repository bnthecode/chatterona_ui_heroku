class WebsocketService {
  // request node ap, node proxies to websocket api
  connection = new WebSocket("ws://localhost:5000");
  connectedChannelId = "";
  connectionsOpen = {};
  // peer = new RTCPeerConnection();

  initializeWebsocket = (callback) => {
    this.connection.addEventListener("open", () => {});

    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // if (data.type === "join-voice") {
      //   return this.handleSocketIncomingVoice(data);
      // }
      callback(data);
    };
  };

  joinChannel = (channelId) => {
    const alreadyConnected = this.connectionsOpen[channelId];
    if (!alreadyConnected) {
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
    }
    this.connectedChannelId = channelId;

    // voice

    // navigator.getUserMedia( { audio: true }, (stream) => {
    //     stream
    //       .getTracks()
    //       .forEach((track) => this.peer.addTrack(track, stream));
    //       this.peer.ontrack = function({ streams: [stream] }) {
    //         console.log('idk')
    //        };
    //   },
    //   (error) => {
    //     console.warn(error.message);
    //   }
    // );
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
  // handleAddVoice = (stream) => {
  //   // after user says yes ?    this.connection.send(
  //   JSON.stringify({
  //     type: "add-voice",
  //     channelId: this.connectedChannelId,
  //   });
  // };

  // handleSocketIncomingVoice = async (data) => {
  //   await this.peer.setRemoteDescription(new RTCSessionDescription(data.offer));
  //   const answer = await this.peer.createAnswer();
  //   await this.peer.setLocalDescription(new RTCSessionDescription(answer));
  //   this.connection.send({
  //     type: "make-answer",
  //     answer: answer,
  //     channelId: this.connectedChannelId,
  //   });
  // };
}

export default WebsocketService;
