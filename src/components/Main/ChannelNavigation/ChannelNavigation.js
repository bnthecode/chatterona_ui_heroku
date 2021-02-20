import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import { connect } from "react-redux";
import Drawer from "../../_reusable/Drawer";
import ConnectionChannels from "../Connections/ConnectionChannels/ConnectionChannels";
import ConnectionChannelHeader from "../Connections/ConnectionChannels/ConnectionHeader";
import ServerChannelHeader from "../Server/ServerChannels/ServerChannelHeader";
import ServerChannels from "../Server/ServerChannels/ServerChannels";
import ChannelNavigationBottomUser from "./ChannelNavigationBottomUser";
import ChannelHeader from "./ChannelNavigationHeader";
import { withRouter } from "react-router";
import serversHttp from "../../../http/servers-http";
import { setChannelIdRedux } from "../../../redux/actions/mainActions";
import channelsHttp from "../../../http/channels-http";

const styles = () => ({
  drawer: { backgroundColor: "#2f3136", width: "310px" },
  list: { width: "100%", margin: 4 },
  wrapper: { paddingLeft: "72px", width: "calc(100% - 72px)" },
});

class ChannelNavigation extends PureComponent {
  state = {
    channelId: "",
    channels: [],
  };

  componentDidMount = async () => {
    const { route, serverId } = this.props;
    await this.routeHandlers(route, serverId);
  };

  componentDidUpdate = async (prevProps) => {
    const { route, serverId } = this.props;
    if (prevProps.serverId !== serverId || prevProps.route !== route) {
      await this.routeHandlers(route, serverId);
    }
  };

  routeHandlers = async (route, serverId) => {
    switch (route) {
      case "server":
        return await this.serverRouteHandler(serverId);
      case "@me":
        return await this.homeRouteHandler();
      default:
        return null;
    }
  };

  homeRouteHandler = async () => {
    const channels = await channelsHttp.getDirectMessages();
    this.setState({ channels });
    if (channels.length) {
      this.selectChannel(channels[0].channelId);
    }
  };

  serverRouteHandler = async (serverId) => {
    const server = await serversHttp.getServer(serverId);
    const { channels } = server;
    this.setState({ channels });
    this.selectChannel(channels[0].id);
  };

  handleDirectMessage = () => {};

  selectChannel = (channelId) => {
    const { setChannelId } = this.props;
    this.setState({ channelId });
    setChannelId(channelId);
  };

  createChannel = async (channel) => {
    const { route, serverId } = this.props;
    const { channels } = this.state;
    if (route === "@me") {
      const newChannel = await channelsHttp.createDirectMessage(channel);
      this.setState({ channels: [...channels, newChannel] });
      return;
    }
    const newChannel = await channelsHttp.createChannel(serverId, channel);
    this.setState({ channels: [...channels, newChannel] });
  };

  inviteUsers = async (userId) => {
    const { serverId } = this.props;
    await serversHttp.addUserToServer(serverId, userId);
  };

  createDirectMessage = () => {};

  navigateToUserSettings = () => {
    const { history } = this.props;
    history.push("/settings");
  };

  getChannelHeader = (route) => {
    const { friends, serverName } = this.props;
    const connections = <ConnectionChannelHeader />;
    const servers = (
      <ServerChannelHeader
        inviteUsers={this.inviteUsers}
        serverName={serverName}
        friends={friends}
      />
    );
    switch (route) {
      case "@me":
        return connections;
      case "server":
        return servers;

      default:
        return servers;
    }
  };

  getChannelContent = (route) => {
    const { friends, userId } = this.props;
    const { channels, channelId } = this.state;
    const connections = (
      <ConnectionChannels
        channels={channels}
        channelId={channelId}
        friends={friends}
        userId={userId}
        selectChannel={this.selectChannel}
        createChannel={this.createChannel}
        handleDirectMessage={this.handleDirectMessage}
      />
    );
    const server = (
      <ServerChannels
        channels={channels}
        channelId={channelId}
        selectChannel={this.selectChannel}
        createChannel={this.createChannel}
      />
    );
    switch (route) {
      case "@me":
        return connections;
      case "server":
        return server;
      default:
        return server;
    }
  };

  render() {
    const { classes, userPhoto, route, username } = this.props;

    return (
      <Drawer className={classes.drawer} anchor="left">
        <div className={classes.wrapper}>
          <ChannelHeader>{this.getChannelHeader(route)}</ChannelHeader>
          <Divider className={classes.divider} />

          {this.getChannelContent(route)}

          <ChannelNavigationBottomUser
            navigateToUserSettings={this.navigateToUserSettings}
            username={username}
            userPhoto={userPhoto}
          />
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  userPhoto: state.auth.user.photoURL,
  userId: state.auth.user.id,
  friends: state.auth.user.friends,
});

const mapDispatchToProps = (dispatch) => ({
  setChannelId: dispatch(setChannelIdRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(ChannelNavigation)));
