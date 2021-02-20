import { Fade } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import ServerList from "../../components/Main/ServerList/ServerList";
import Header from "../../components/Main/Header";
import ContentNavigation from "./ContentNavigation";
import serversHttp from "../../http/servers-http";
import {
  setServersRedux,
  setServerIdRedux,
} from "../../redux/actions/mainActions";

import { setUserFriendsRedux } from "../../redux/actions/authActions";

import ChannelNavigation from "../../components/Main/ChannelNavigation/ChannelNavigation";
import { withStyles } from "@material-ui/styles";
import usersHttp from "../../http/users.http";
import UserSettings from "./UserSettings";
import ServerUsers from "../../components/Main/Server/ServerUsers";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
    left: 310,
    width: "calc(100% - 310px)",
    height: "100vh",
  },
});

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    selectedItem: null,
    serverId: null,
    route: "home",
  };

  componentDidMount = async () => {
    const { setServers, setUserFriends, history } = this.props;
    const servers = await serversHttp.getServers();
    const friends = await usersHttp.getUserFriends();
    setServers(servers || []);
    setUserFriends(friends);

    this.setState({ selectedItem: "home", route: "home" });
    history.push("/@me");
  };

  createServer = async (server) => {
    const { servers, setServers } = this.props;
    const newServer = await serversHttp.createServer(server);
    setServers([...servers, newServer]);
    this.selectServer(newServer.id);
  };

  selectServer = async (serverId) => {
    const { setServerId, history } = this.props;
    setServerId(serverId);
    this.setState({ serverId });
    history.push(`/${serverId}`);
  };


  handleSelection = (selectedItem, id) => {
    const { history } = this.props;
    this.setState({
      selectedItem: selectedItem,
      serverId: id || null,
      route: selectedItem,
    });
    if (selectedItem === "@me") history.push("/@me");
    if (selectedItem === 'public-servers') history.push('public-servers');
    return id ? this.selectServer(id) : "";
  };

  render() {
    const { route, selectedItem, serverId } = this.state;
    const { servers, classes, channelId } = this.props;
    const server = servers.find((svr) => svr.id === serverId) || {};
    const { name: serverName } = server;
    return (
      <>
        <Switch>
          <Route exact path="/settings" component={UserSettings} />
          <Route path="/">
           
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
