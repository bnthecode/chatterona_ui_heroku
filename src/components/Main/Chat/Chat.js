import React, { Component, PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import channelsHttp from "../../../http/channels-http";
import Messages from "../Messages/Messages";
import MessageInput from "./MessageInput";
import Typers from "./Typers";
import {
  determineCanScroll,
  determineChatComponentUpdate,
} from "../../../utilities/component-utilities";

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
  chatWrapper: {
    position: "relative",

    padding: 8,
    left: 310,
    width: "calc(100% - 515px)",
    height: "calc(100vh - 48px)",
  },
  messageWrapper: {
    position: "relative",
    top: 40,
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

  messageRef = React.createRef();

  componentDidUpdate = () => {
    const { messages } = this.props;
    const lastMessage = this.getLastMessage(messages);
    const scrollRef = determineCanScroll(this.messageRef);
    this.setState({ messages, lastMessage });
    
    if (scrollRef) {
      // instead of mapping through elements on top of each other, maybe try loading them backwards so we never have to scroll down at the start
      scrollRef.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };


  // shouldComponentUpdate = (prevProps) => {
  //   // this is actually fast :)
  //   const { messages, channelId } = this.props;
  //   if(messages.length && !this.state.messages.length) return true;
  //   const lastMessage = this.getLastMessage(messages);
  //   const lastMessageUpdated = this.getLastMessageUpdated(lastMessage);
  //   const updateComponent = determineChatComponentUpdate(
  //     lastMessageUpdated,
  //     prevProps,
  //     channelId,
  //     messages
  //   );
  //   return updateComponent;
  // }

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
    } = await channelsHttp.createChannelMessage(
      channelId,
      message,
    );
    sendWebsocketMessage(channelId, dbMessage, merge);
    this.setState({ loadingMessage: false });
  };

  render() {
    const { messages } = this.state;
    const { classes, typers } = this.props;
    return (
      <div className={classes.chatWrapper}>
        <div className={classes.messageWrapper}>
          <div className={classes.container}>
            <Messages messages={messages} messageRef={this.messageRef} />
          </div>
        </div>
        <Typers typers={typers} />
        <MessageInput addMessageToChannel={this.addMessageToChannel} />
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
