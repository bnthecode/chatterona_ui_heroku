import { Fade } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Channels from "../components/Main/Channels/Channels";
import Chat from "../components/Main/Chat/Chat";
import Header from "../components/Main/Header";
import Servers from "../components/Main/Servers/Servers";
import ServerUsers from "../components/Main/Servers/ServerUsers";
import channelsHttp from "../http/channels-http";
import serversHttp from "../http/servers-http";
import usersHttp from "../http/users.http";
import {
  setServersRedux,
  setServerIdRedux,
  setChannelsRedux,
  setChannelIdRedux,
  setChannelMessagesRedux,
  setServerUsersRedux,
} from "../redux/actions/appActions";
import { setAuthUserRedux } from "../redux/actions/authActions";
import WebsocketService from "../services/Websocket";
import peer from 'peerjs';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }
  state = {};
  websocket = new WebsocketService("ws://localhost:5000");

  componentDidMount = async () => {
    this.websocket.initializeWebsocket(this.websocketCallback);
    const { setServers } = this.props;
    const servers = await serversHttp.getServers();
    setServers(servers || []);
    this.selectServer(servers.length ? servers[0].id : "");


  };

  websocketCallback = (data) => {
    const { type, message } = data;
    switch (type) {
      case "send-message": {
        return this.handleMessageWebsockets(message, message.merge);
      }
      default: {
        console.log("nice");
      }
    }
  };

  createServer = async (server) => {
    const { servers, setServers } = this.props;
    const newServer = await serversHttp.createServer(server);
    setServers([...servers, newServer]);
    this.selectServer(newServer.id);
  };

  selectServer = async (serverId) => {
    const { setServerId, setChannels } = this.props;
    setServerId(serverId || "");
    const server = await serversHttp.getServer(serverId);
    setChannels(server ? server.channels : []);
    this.selectChannel(
      server.channels && server.channels.length ? server.channels[0].id : ""
    );
    if (serverId) this.getServerUsers(serverId);
  };

  createChannel = () => {
    // const { servers, setServers } = this.props;
    // const newServer = await serversHttp.createServer(server);
    // setServers([...servers, newServer]);
  };

  handleMessageWebsockets = (message, merge) => {
    const { setChannelMessages, messages } = this.props;
    const updatedLast = merge
      ? messages.splice(0, messages.length - 1)
      : messages;
    setChannelMessages([...updatedLast, message]);
  };

  selectChannel = async (channelId) => {
    const { setChannelId } = this.props;
    setChannelId(channelId);
    this.getChannelMessages(channelId);
    this.websocket.joinChannel(channelId);
  };

  getChannelMessages = async (channelId) => {
    const { setChannelMessages } = this.props;
    const messages = await channelsHttp.getChannelMessages(channelId, 1, 6);
    setChannelMessages(messages);
  };

  sendWebsocketMessage = (channelId, message, merge) => {
    this.websocket.sendMessage(channelId, message, merge);
  };

  getServerUsers = async (serverId) => {
    const { setServerUsers } = this.props;
    const users = await serversHttp.getServerUsers(serverId);
    setServerUsers(users);
  };

  logoutUser = async () => {
    const { history } = this.props;

    await usersHttp.logoutUser();
    history.push("/login");
  };

  navigateToUserSettings = () => {
    const { history } = this.props;
    history.push("/settings");
  };

  render() {
    const {
      servers,
      serverId,
      channels,
      channelId,
      messages,
      username,
      userPhoto,
      users,
    } = this.props;
    const server =
      serverId && servers && servers.find((svr) => svr.id === serverId);
    const channel =
      channelId && channels && channels.find((chl) => chl.id === channelId);

    return (
      <Fade in timeout={500}>
        <div>
          <Header
            channelName={channel ? channel.name : ""}
            logoutUser={this.logoutUser}
          />

          <Channels
            channels={channels}
            channelId={channelId}
            serverName={server ? server.name : "nothing"}
            selectChannel={this.selectChannel}
            createChannel={this.createChannel}
            username={username}
            userPhoto={userPhoto}
            navigateToUserSettings={this.navigateToUserSettings}
          />
          <Servers
            servers={servers}
            serverId={serverId}
            selectServer={this.selectServer}
            createServer={this.createServer}
          />
          <Chat
            username={username}
            typers={this.state.typers}
            messages={messages}
            channelId={channelId}
            getChannelMessages={this.getChannelMessages}
            sendWebsocketMessage={this.sendWebsocketMessage}
            updateTyping={this.updateTyping}
          />
          <ServerUsers users={users} />
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  userPhoto: state.auth.user.photoURL,
  servers: state.app.servers,
  serverId: state.app.serverId,
  channels: state.app.channels,
  channelId: state.app.channelId,
  messages: state.app.messages,
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => ({
  setServers: dispatch(setServersRedux),
  setServerId: dispatch(setServerIdRedux),
  setChannels: dispatch(setChannelsRedux),
  setChannelId: dispatch(setChannelIdRedux),
  setChannelMessages: dispatch(setChannelMessagesRedux),
  setServerUsers: dispatch(setServerUsersRedux),
  setAuthUser: dispatch(setAuthUserRedux),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
