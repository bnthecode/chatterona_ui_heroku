import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import ConnectionsHeader from "./navigation-items/connections";
import ServerHeader from "./navigation-items/server";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";
import { updateHeaderFilterRedux } from "../../../redux/actions/connectionsActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    left: 0,
  },
  appbar: {
    position: "absolute",
    width: "calc(100% - 312px)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    left: 312,
    height: 46,
  },
  headerText: {
    color: "white",
    fontSize: 14,
    fontWeight: 700,
  },
  headerIcon: {
    marginRight: 10,
  },
  dividerWrapper: {
    width: 20,
    marginBottom: 22,
  },
  divider: {
    height: 20,
    width: 2,
    backgroundColor: "white",
  },
  subHeaderWrapper: {
    width: 100,
    marginBottom: 20,
  },
  subHeaderText: {
    color: "grey",
    fontSize: 14,
    fontWeight: 700,
  },
});

class HeaderNavigation extends PureComponent {

  determineHeaderElevation = () => {
    const {  history } = this.props;
    const preventElevationOn = ['public-servers', 'store'];
   const hideElevation = preventElevationOn.filter((path) => history.location.pathname.includes(path));
   return hideElevation.length ? 0 : 2;
  }
  render() {
    const { classes, updateHeaderFilter, channel } = this.props;

    
    return (
      <AppBar elevation={this.determineHeaderElevation()} className={classes.appbar} position="static">
        <Toolbar>

          <Switch>
            <Route path={`/channels/@me`}>
              <ConnectionsHeader updateHeaderFilter={updateHeaderFilter} />
            </Route>
            <Route exact path={`/channels/:id`}>
              <ServerHeader channel={channel} />
            </Route>

          </Switch>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state) => ({
  channel: state.main.channel
})

const mapDispatchToProps = (dispatch) => ({
  updateHeaderFilter: dispatch(updateHeaderFilterRedux),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(HeaderNavigation)));
