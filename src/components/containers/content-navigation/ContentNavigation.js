import React, { createRef, PureComponent } from "react";
import { connect } from "react-redux";
import channelsHttp from "../../../http/channels-http";
import serversHttp from "../../../http/servers-http";
import {
  setServerUsersRedux,
  setTempServerRedux,
} from "../../../redux/actions/mainActions";
import withWebsocket from "../../../services/HOC's/withWebsocket";
import ConnectionsContent from "./navigation-items/connections";
import ServerContent from "./navigation-items/server";
import PublicServersContent from "./navigation-items/public-servers";
import { Route, Switch, withRouter } from "react-router";
import JoinNewServerModal from "../../main/content-navigation/JoinNewServerModal";
import PreviewModal from "../../main/preview-modal/PreviewModal";
import { setPublicServersRedux } from "../../../redux/actions/publicServersActions";

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
    const {
      channelId,
      joinChannel: websocketJoinChannel,
      setPublicServers,
      
    } = this.props;
    if (channelId) {
      websocketJoinChannel(channelId);
      const messages = await channelsHttp.getChannelMessages(channelId);
      this.setState({ messages });
    }
    const publicServers = await serversHttp.getPublicServers();
    setPublicServers(publicServers);
  };

  displayNewServerModal = (value) => {
    this.setState({ newServerModalOpen: value });
  };

  componentDidUpdate = async (prevProps) => {
    const { messages } = this.state;
    const { channel, websocketEvent } = this.props;
    if (websocketEvent && websocketEvent === "message") {
      const {
        websocketMessage: { message, merge },
      } = this.props;

      const updatedLast = merge
        ? messages.splice(0, messages.length - 1)
        : messages;

      this.setState({ messages: [...updatedLast, message] });
    }
    if (channel.id !== prevProps.channel.id) {
      await this.handleNewChannelSelection(channel.id || channel.channelId);
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

  selectPublicServer = async (server) => {
    const { setTempServer, handleSelection, servers } = this.props;
    const alreadyJoined = servers.find((svr) => svr.id === server._id);
    if (!alreadyJoined) {
      const foundServer = await serversHttp.getServer(server._id);
      setTempServer(foundServer);
      this.displayNewServerModal(true);
    }
    handleSelection("server", server._id);
  };

  sendWebsocketMessage = (message, merge) => {
    const { sendMessage: websocketSendMessage, channelId } = this.props;
    websocketSendMessage(channelId, message, merge);
  };

  goBack = () => {
    const { history, setTempServer } = this.props;
    history.goBack();
    setTempServer(null);
  };

  addUserToServer = async (serverId) => {
    const { updateServersList, userId, setTempServer, handleSelection } = this.props;
    await serversHttp.addUserToServer(serverId, userId);
    const servers = await serversHttp.getServers();
    updateServersList(servers);
    setTempServer(null);
    handleSelection('server', serverId);
  };

  sendWebsocketChannelTyper = () => {
    const { sendTyper: websocketSendTyper, channelId, username } = this.props;
    websocketSendTyper(channelId, username);
  };

  updateDrawer = () => {
    const { userDrawer } = this.state;
    this.setState({ userDrawer: !userDrawer });
  };

  render() {
    const {
      username,
      channelId,
      serverName,
      serverId,
      websocketTypers,
      route,
      friends,
      headerFilter,
      publicServerList,
      tempServer,
      channel
    } = this.props;
    const { messages, userDrawer, newServerModalOpen } = this.state;

    return (
      <>
        <PreviewModal
          addUserToServer={this.addUserToServer}
          goBack={this.goBack}
          tempServer={tempServer}
        ></PreviewModal>
        <div
          style={{
            top: 48,
            left: 2,
            height: "calc(100vh - 70px)",
            position: "relative",
            transition: "1s width",
            width: `calc(100% - 24px)`,
            padding: 8,
          }}
        >
          <Switch>
            <Route path={`/channels/@me`}>
              <ConnectionsContent
                username={username}
                messages={messages}
                userDrawer={userDrawer}
                channelId={channelId}
                channel={channel}
                messageRef={this.messageRef}
                sendWebsocketChannelTyper={this.sendWebsocketChannelTyper}
                sendWebsocketMessage={this.sendWebsocketMessage}
                websocketTypers={websocketTypers}
                friends={friends}
                headerFilter={headerFilter}
              />
            </Route>
            <Route exact path={`/channels/:id`}>
              <ServerContent
                username={username}
                messages={messages}
                userDrawer={userDrawer}
                channelId={channelId}
                channel={channel}
                messageRef={this.messageRef}
                sendWebsocketChannelTyper={this.sendWebsocketChannelTyper}
                sendWebsocketMessage={this.sendWebsocketMessage}
                websocketTypers={websocketTypers}
                serverName={serverName}
                serverId={serverId}
                route={route}
              />
            </Route>

            <Route path="/public-servers">
              <PublicServersContent
                selectPublicServer={this.selectPublicServer}
                publicServerList={publicServerList}
              />
            </Route>
          </Switch>
          <JoinNewServerModal
            handleNewChannelSelection={this.handleNewChannelSelection}
            displayNewServerModal={this.displayNewServerModal}
            open={newServerModalOpen}
            server={tempServer}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  friends: state.auth.user.friends,
  userId: state.auth.user.id,
  serverUsers: state.main.serverUsers,
  channel: state.main.channel,
  tempServer: state.main.tempServer,
  channelId: state.main.channelId,
  headerFilter: state.subPages.connections.headerFilter,
  publicServerList: state.subPages.publicServers.serverList,
});

const mapDispatchToProps = (dispatch) => ({
  setServerUsers: dispatch(setServerUsersRedux),
  setTempServer: dispatch(setTempServerRedux),
  setPublicServers: dispatch(setPublicServersRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWebsocket(withRouter(ContentNavigation)));
