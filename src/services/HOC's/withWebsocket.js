import React from "react";

const withWebsocket = (Component) => {
  class WebsocketService extends React.Component {
    connection = new WebSocket("ws://localhost:5000");
    state = {
      connectedChannelId: {},
      connectionsOpen: {},
      websocketTypers: [],
      currentUsername: null,
      messages: [],
    };

    componentDidMount = async () => {
      await this.establishConnection();
      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { type, message, username } = data;
        switch (type) {
          case "send-message": {
            return this.handleIncomingSocketMessage(message, message.merge);
          }
          case "channel-typer": {
            return this.handleIncomingSocketChannelTyper(username);
          }
          default:
            return null;
        }
      };
    };

    establishConnection = () => {
      const startTime = performance.now()
      return new Promise((resolve, reject) => {
        let currentAttempt = 0;
        const maxNumberOfAttempts = 10;
        const intervalTime = currentAttempt * 100; //ms

        const interval = setInterval(() => {
          if (currentAttempt > maxNumberOfAttempts - 1) {
            // console.log(
            //   "trying to connect on retry",
            //   currentAttempt,
            //   "retrying in intervalTime"
            // );
            clearInterval(interval);
            reject(new Error("Maximum number of attempts exceeded"));
          } else if (this.connection.readyState === this.connection.OPEN) {
            const endTime = performance.now()
            console.log(`%c[WEBSOCKET] took ${endTime - startTime}ms`, "color:DodgerBlue");
            clearInterval(interval);
            resolve();
          }
          currentAttempt++;
        }, intervalTime);
      });
    };


    joinChannel = async (channelId) => {
      await this.establishConnection();
      console.log(`%c[WEBSOCKET] joining channel ${channelId}`, "color:DodgerBlue");
      this.connection.send(
        JSON.stringify({
          type: "join-channel",
          channelId,
        })
      );
      this.setState({
        connectionsOpen: {
          ...this.connectionsOpen,
          [channelId]: true,
        },
        connectedChannelId: channelId,
      });
    };

    cancelWebsocketEvent = () => {
      this.setState({ websocketEvent: null });
    };

    handleIncomingSocketMessage = (message, merge) => {
      console.log(`%c[WEBSOCKET] incoming message`, "color:DodgerBlue");
      const { websocketTypers } = this.state;
      const prevTypers = websocketTypers.filter(
        (n) => n !== message.author.username
      );
      this.setState(
        {
          websocketEvent: "message",
          websocketMessage: { message, merge },
          websocketTypers: prevTypers,
        },
        this.cancelWebsocketEvent
      );
    };

    handleIncomingSocketChannelTyper = (username) => {
      console.log(`%c[WEBSOCKET] incoming typing`, "color:DodgerBlue");
      const { websocketTypers, currentUsername } = this.state;
      setTimeout(() => {
        this.setState({
          websocketTypers: websocketTypers.filter(
            (uname) => uname !== username
          ),
        });
      }, 10000);
      if (username !== currentUsername) {
        this.setState(
          {
            websocketEvent: "typer",
            websocketTypers: [...websocketTypers, username],
          },
          this.cancelWebsocketEvent
        );
      }
    };

    sendTyper = async (channelId, username) => {
      this.connection.send(
        JSON.stringify({
          type: "channel-typer",
          channelId: channelId,
          username: username,
        })
      );
      this.setState({ currentUsername: username });
    };

    sendMessage = async (channelId, message, merge) => {
      this.connection.send(
        JSON.stringify({
          type: "send-message",
          message: { ...message, merge: merge },
          channelId: channelId,
        })
      );
    };

    render() {
      const { websocketTypers, websocketEvent, websocketMessage } = this.state;
      return (
        <Component
          joinChannel={this.joinChannel}
          sendMessage={this.sendMessage}
          sendTyper={this.sendTyper}
          websocketEvent={websocketEvent}
          websocketMessage={websocketMessage}
          websocketTypers={websocketTypers}
          {...this.props}
        />
      );
    }
  }

  return WebsocketService;
};

export default withWebsocket;
