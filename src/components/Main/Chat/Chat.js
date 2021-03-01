import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import channelsHttp from "../../../http/channels-http";
import Messages from "./messages/Messages";
import MessageInput from "./MessageInput";
import Typers from "./Typers";
import { determineCanScroll } from "../../../utilities/component-utilities";
import InitialChannelMessage from "./messages/InitialChannelMessage";

const styles = () => ({
  "@global": {
    "*::-webkit-scrollbar-thumb": {
      display: "none",
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
    "::-webkit-scrollbar-track": {
      display: "none",
    },
    "::-webkit-scrollbar-thumb": {
      display: "none",
    },
    "::-webkit-scrollbar-thumb:hover": {
      display: "none",
    },
  },

  messageWrapper: {
    position: "relative",
    top: 0,
  },
  container: {
    maxHeight: "calc(100vh - 160px)",
    padding: 0,
    overflow: "auto",
  },
});

class Chat extends PureComponent {
  state = {
    messages: [],
    lastMessage: null,
  };

  componentDidUpdate = () => {
    const { messages, messageRef } = this.props;
    const lastMessage = this.getLastMessage(messages);
    const scrollRef = determineCanScroll(messageRef);
    this.setState({ messages, lastMessage });

    if (scrollRef) {
      scrollRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  getLastMessageUpdated = (lastMessage) => {
    const { lastMessage: previousLastMessage } = this.state;
    if (previousLastMessage) {
      return (
        lastMessage &&
        lastMessage.content &&
        lastMessage.content.length !== previousLastMessage.content.length
      );
    }
  };

  getLastMessage = (messages) => {
    return messages.length && messages[messages.length - 1];
  };

  determineLastMessage = (message) => {
    const { username } = this.props;
    return message && message.author && message.author.username === username;
  };

  addMessageToChannel = async (message) => {
    this.setState({ loadingMessage: true });
    const { channelId, sendWebsocketMessage } = this.props;

    const {
      message: dbMessage,
      merge,
    } = await channelsHttp.createChannelMessage(channelId, message);
    sendWebsocketMessage(dbMessage, merge);
    this.setState({ loadingMessage: false });
  };

  render() {
    const { messages } = this.state;
    const {
      classes,
      websocketTypers,
      messageRef,
      sendWebsocketChannelTyper,
      channel
    } = this.props;
    return (
      <div>
        <div className={classes.messageWrapper}>
          <div className={classes.container}>
            <InitialChannelMessage channel={channel}></InitialChannelMessage>
            <Messages messages={messages} messageRef={messageRef} />
          </div>
        </div>
        <Typers websocketTypers={websocketTypers} />
        <MessageInput
          sendWebsocketChannelTyper={sendWebsocketChannelTyper}
          addMessageToChannel={this.addMessageToChannel}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
