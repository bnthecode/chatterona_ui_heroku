import React, { createRef, PureComponent } from "react";
import { connect } from "react-redux";
import Chat from "../../components/Main/Chat";
import Header from "../../components/Main/Header";
import ServerUsers from "../../components/Main/Server/ServerUsers";
import channelsHttp from "../../http/channels-http";
import serversHttp from "../../http/servers-http";
import { setServerUsersRedux } from "../../redux/actions/appActions";
import withWebsocket from "../../services/HOC's/withWebsocket";
import PublicServers from "./PublicServers";

class ContentNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.messageRef = createRef();
  }

  state = {
    messages: [],
    userDrawer: true,
  };

  componentDidMount = async () => {
    const { channelId, joinChannel: websocketJoinChannel } = this.props;
    websocketJoinChannel(channelId);
    const messages = await channelsHttp.getChannelMessages(channelId);
    this.setState({ messages });
  };

  componentDidUpdate = async (prevProps) => {
    const { messages } = this.state;
    const { channelId, websocketEvent } = this.props;
    if (websocketEvent && websocketEvent === "message") {
      const {
        websocketMessage: { message, merge },
      } = this.props;

      const updatedLast = merge
        ? messages.splice(0, messages.length - 1)
        : messages;

      this.setState({ messages: [...updatedLast, message] });
    }
    if (channelId !== prevProps.channelId) {
      await this.handleNewChannelSelection(channelId);
    }
  };

  handleNewChannelSelection = async (channelId) => {
    const { joinChannel: websocketJoinChannel } = this.props;

    const messages = await channelsHttp.getChannelMessages(channelId);
    this.setState({ messages });
    websocketJoinChannel(channelId);
  };

  getServerUsers = async (serverId) => {
    const { setServerUsers } = this.props;
    const users = await serversHttp.getServerUsers(serverId);
    setServerUsers(users);
  };

  sendWebsocketMessage = (message, merge) => {
    const { sendMessage: websocketSendMessage, channelId } = this.props;
    websocketSendMessage(channelId, message, merge);
  };

  sendWebsocketChannelTyper = () => {
    const { sendTyper: websocketSendTyper, channelId, username } = this.props;
    websocketSendTyper(channelId, username);
  };

  updateDrawer = () => {
    const { userDrawer } = this.state;
    this.setState({ userDrawer: !userDrawer });
  };

  determineContent = (route) => {
    const {
      username,
      channelId,
      serverName,
      serverId,
      websocketTypers,
    } = this.props;
    const { messages, userDrawer } = this.state;
    switch (route) {
      case "public-servers": {
        return <PublicServers />;
      }
      case "whatever-else":
        break;
      default:
        return (
          <div>
            <Header
              updateDrawer={this.updateDrawer}
              serverName={serverName}
              serverId={serverId}
              route={route}
            />
            <div style={{ padding: 8 }}>
              <Chat
                username={username}
                messages={messages}
                userDrawer={userDrawer}
                channelId={channelId}
                messageRef={this.messageRef}
                sendWebsocketChannelTyper={this.sendWebsocketChannelTyper}
                sendWebsocketMessage={this.sendWebsocketMessage}
                websocketTypers={websocketTypers}
              />
            </div>
            <ServerUsers
              userDrawer={userDrawer}
              serverName={serverName}
              serverId={serverId}
              route={route}
            />
          </div>
        );
    }
  };

  render() {
    const { route } = this.props;
    return this.determineContent(route);
  }
}

const mapStateToProps = (state) => ({
  serverUsers: state.server.serverUsers,
  username: state.auth.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  setServerUsers: dispatch(setServerUsersRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWebsocket(ContentNavigation));
