import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import { connect } from "react-redux";
import Drawer from "../../_reusable/Drawer";
import ChannelNavigationBottomUser from "../../main/channel-navigation/ChannelNavigationBottomUser";
import { withRouter } from "react-router";
import serversHttp from "../../../http/servers-http";
import { setChannelIdRedux, setChannelRedux } from "../../../redux/actions/mainActions";
import channelsHttp from "../../../http/channels-http";
import ConnectionsChannelNavigation from "./navigation-items/connections";
import ServerChannelNavigation from "./navigation-items/server";
import PublicServersChannelNavigation from "./navigation-items/public-servers";

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
    const { history } = this.props;
    const channels = await channelsHttp.getDirectMessages();
    this.setState({ channels });
    // history.push(`${match.url}/${channelId}`);
  };

  serverRouteHandler = async (serverId) => {
    const server = await serversHttp.getServer(serverId);
    const { channels } = server;
    this.setState({ channels });
    this.selectChannel(channels[0].id);
  };

  handleDirectMessage = () => {};

  selectChannel = (channelId) => {
    const { setChannelId, history, match, route } = this.props;
    this.setState({ channelId });
    setChannelId(channelId);
    // need better routing for sure..
    if(route === '@me') history.push(`${match.url}/@me/${channelId}`);
    else history.push(`${match.url}/${channelId}`);

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

  getChannelContent = (route) => {
    const { friends, userId, serverName } = this.props;
    const { channels, channelId } = this.state;

    switch (route) {
      case "@me":
        return (
          <ConnectionsChannelNavigation
            channels={channels}
            channelId={channelId}
            friends={friends}
            userId={userId}
            selectChannel={this.selectChannel}
            createChannel={this.createChannel}
            handleDirectMessage={this.handleDirectMessage}
          />
        );
      case "server":
        return (
          <ServerChannelNavigation
            channels={channels}
            channelId={channelId}
            selectChannel={this.selectChannel}
            createChannel={this.createChannel}
            inviteUsers={this.inviteUsers}
            serverName={serverName}
            friends={friends}
          />
        );
      case "public-servers":
        return <PublicServersChannelNavigation />;
      default:
        return null;
    }
  };

  render() {
    const { classes, userPhoto, route, username, updateSelectedChannel } = this.props;

    return (
      <Drawer className={classes.drawer} anchor="left">
        <div className={classes.wrapper}>
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
  setChannel: dispatch(setChannelRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(ChannelNavigation)));
