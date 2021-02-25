import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import ServerList from "../components/main/server-list/ServerList";
import ContentNavigation from "../components/containers/content-navigation/ContentNavigation";
import serversHttp from "../http/servers-http";
import {
  setServersRedux,
  setServerIdRedux,
} from "../redux/actions/mainActions";

import { setUserFriendsRedux } from "../redux/actions/authActions";

import ChannelNavigation from "../components/containers/channel-navigation/ChannelNavigation";
import { withStyles } from "@material-ui/styles";
import usersHttp from "../http/users.http";
import UserSettings from "../components/user-settings/UserSettings";
import HeaderNavigation from "../components/containers/header-navigation/HeaderNavigation";

const styles = () => ({
  wrapper: {
    position: "relative",
    left: 310,
    width: "calc(100% - 310px)",
    height: "100vh",
  },
});

class Main extends PureComponent {
  state = {
    selectedItem: null,
    serverId: null,
    route: "@me",
  };

  componentDidMount = async () => {
    const { setServers, setUserFriends, history } = this.props;
    const servers = await serversHttp.getServers();
    const friends = await usersHttp.getUserFriends();
    setServers(servers || []);
    setUserFriends(friends);

    this.setState({ selectedItem: "@me", route: "@me" });
    history.push("/channels/@me");
  };

  createServer = async (server) => {
    const { servers, setServers } = this.props;
    const newServer = await serversHttp.createServer(server);
    setServers([...servers, newServer]);
    this.handleSelection("server", newServer.id);
  };

  selectServer = async (serverId) => {
    const { setServerId, history } = this.props;
    setServerId(serverId);
    this.setState({ serverId });
    history.push(`/channels/${serverId}`);
  };

  handleSelection = (selectedItem, id) => {
    const { history } = this.props;
    this.setState({
      selectedItem: selectedItem,
      serverId: id || null,
      route: selectedItem,
    });
    if (selectedItem === "@me") history.push("/channels/@me");
    if (selectedItem === "public-servers") history.push("public-servers");
    return id ? this.selectServer(id) : "";
  };


  updateSelectedChannel = (channelName) => {
    // used to pass through other components
    this.setState({ channelName })
  }

  render() {
    const { route, selectedItem, serverId, channel } = this.state;
    const { servers, classes, channelId } = this.props;
    const server = servers.find((svr) => svr.id === serverId) || {};
    const { name: serverName } = server;
    return (
      <>
        <Switch>
          <Route exact path="/settings" component={UserSettings} />
          <Route path="/channels">
            <HeaderNavigation channel={channel} route={route} />
            <ServerList
              servers={servers}
              selectedItem={selectedItem}
              serverId={serverId}
              handleSelection={this.handleSelection}
              createServer={this.createServer}
            />

            <ChannelNavigation
              serverName={serverName}
              serverId={serverId}
              route={route}
              updateSelectedChannel={this.updateSelectedChannel}
            />

            <div className={classes.wrapper}>
              <ContentNavigation route={route} channelId={channelId} />
            </div>
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  servers: state.main.servers,
  serverId: state.main.serverId,
  channelId: state.main.channelId,
});

const mapDispatchToProps = (dispatch) => ({
  setServers: dispatch(setServersRedux),
  setServerId: dispatch(setServerIdRedux),
  setUserFriends: dispatch(setUserFriendsRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Main));
