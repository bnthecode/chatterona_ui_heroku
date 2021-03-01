import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import { connect } from "react-redux";
import Drawer from "../../_reusable/Drawer";
import ChannelNavigationBottomUser from "../../main/channel-navigation/ChannelNavigationBottomUser";
import { Route, Switch, withRouter } from "react-router";
import serversHttp from "../../../http/servers-http";
import {
  setChannelRedux,
  setChannelIdRedux
} from "../../../redux/actions/mainActions";
import channelsHttp from "../../../http/channels-http";
import ConnectionsChannelNavigation from "./navigation-items/connections";
import ServerChannelNavigation from "./navigation-items/server";
import PublicServersChannelNavigation from "./navigation-items/public-servers";
import categoryHttp from "../../../http/categories-http";
import { setPublicServersRedux } from "../../../redux/actions/publicServersActions";

const styles = () => ({
  drawer: { backgroundColor: "#2f3136", width: "310px" },
  list: { width: "100%", margin: 4 },
  wrapper: { paddingLeft: "72px", width: "calc(100% - 72px)" },
});

class ChannelNavigation extends PureComponent {
  state = {
    channelId: "",
    channels: [],
    directMessages: [],
    categories: [],
    voiceConnected: false
  };

  componentDidMount = async () => {
    const { route, serverId } = this.props;
    await this.routeHandlers(route, serverId);
  };

  componentDidUpdate = async (prevProps) => {
    const { route, serverId } = this.props;
    if (prevProps.serverId !== serverId || prevProps.route !== route) {
      this.setState({ channels: [] });
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
    const directMessages = await channelsHttp.getDirectMessages();
    this.setState({ directMessages });
  };

  serverRouteHandler = async (serverId) => {
    const { setChannel } = this.props;
    const categories = await serversHttp.getServerCategories(serverId);
    this.setState({ categories });
    this.selectChannel(categories[0].channels[0]);
    setChannel(categories[0].channels[0]);
  };

  handleDirectMessage = () => {};

  selectChannel = (channel) => {
    if(channel.type === 'text') {
      const { history, setChannel, setChannelId } = this.props;
      this.setState({ channelId: channel.id });
      setChannel(channel);
      history.push(`/channels/${channel.id}`);
      setChannelId(channel.id);
    }
    else {
      this.setState({ voiceConnected: true})
    }
  };

  selectDirectMessage = (dm) => {
      const { history, setChannel, setChannelId } = this.props;
      this.setState({ channelId: dm.channelId });
      setChannel(dm);
      setChannelId(dm.channelId);
      history.push(`/channels/@me/${dm.channelId}`);
  
  };

  selectListItem = (path) => {
    const { history } = this.props;
    if (path !== "nitro") history.push(`/channels/@me`);
    else history.push(`/channels/@me/store`);
  };

  createDirectMessage = async (dm) => {
    const { directMessages } = this.state;
    const newDirectMessage = await channelsHttp.createDirectMessage(dm);
    this.setState({ directMessages: [...directMessages, newDirectMessage] });
    return;
  };

  createChannel = async (categoryId, channel) => {
    const { categories } = this.state;
    const updatedCategory = await categoryHttp.addChannelToCategory(
      categoryId,
      channel
    );
    const currentIdx = categories.findIndex((ct) => ct._id === categoryId);
    const arrayCopy = [...categories];
    arrayCopy[currentIdx] = updatedCategory;
    this.setState({ categories: arrayCopy });
  };

  inviteUsers = async (userId) => {
    const { serverId } = this.props;
    await serversHttp.addUserToServer(serverId, userId);
  };

  navigateToUserSettings = () => {
    const { history } = this.props;
    history.push("/settings");
  };


  selectCategory = async (name) => {
    const { setPublicServers } = this.props;
    // by category
    const publicServers = await serversHttp.getPublicServers();
    setPublicServers(publicServers)
  }

  render() {
    const { classes, userPhoto, username } = this.props;

    const { friends, userId, serverName, publicServers } = this.props;
    const { channelId, categories, directMessages, voiceConnected } = this.state;

    return (
      <Drawer className={classes.drawer} anchor="left">
        <div className={classes.wrapper}>
          <Switch>
            <Route path="/channels/@me">
              <ConnectionsChannelNavigation
                directMessages={directMessages}
                channelId={channelId}
                friends={friends}
                userId={userId}
                selectDirectMessage={this.selectDirectMessage}
                createDirectMessage={this.createDirectMessage}
                selectListItem={this.selectListItem}
              />
            </Route>

            <Route exact path="/channels/:id">
              <ServerChannelNavigation
                categories={categories}
                channelId={channelId}
                selectChannel={this.selectChannel}
                createChannel={this.createChannel}
                inviteUsers={this.inviteUsers}
                serverName={serverName}
                friends={friends}
              />
            </Route>

            <Route exact path="/public-servers">
              <PublicServersChannelNavigation
                selectCategory={this.selectCategory}
                publicServers={publicServers}
              />
            </Route>
          </Switch>
          <ChannelNavigationBottomUser
            voiceConnected={voiceConnected}
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
  channelId: state.main.channelId,
  publicServers: state.subPages.publicServers.serverList,
});

const mapDispatchToProps = (dispatch) => ({
  setChannel: dispatch(setChannelRedux),
  setChannelId: dispatch(setChannelIdRedux),
  setPublicServers: dispatch(setPublicServersRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(ChannelNavigation)));
