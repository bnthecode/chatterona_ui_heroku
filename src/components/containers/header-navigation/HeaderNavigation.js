import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import ConnectionsHeader from "./navigation-items/connections";
import ServerHeader from "./navigation-items/server";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    left: 0,
  },
  appbar: {
    position: 'absolute',
    width: 'calc(100% - 312px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  hasHeader = (route) => {
    switch (route) {
      case "@me":
        return true;
      case "server":
        return true;
      default:
        return false;
    }
  };

  getHeaderContent = (route) => {
    switch (route) {
      case "@me":
        return <ConnectionsHeader />;
      case "server":
        return <ServerHeader />;
      default:
        return null;
    }
  };

  render() {
    const { route, classes, channel } = this.props;
    const hasHeader = this.hasHeader(route);
    return hasHeader ? (
      <AppBar elevation={2} className={classes.appbar} position="static">
        <Toolbar>{this.getHeaderContent(route)}</Toolbar>
      </AppBar>
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(HeaderNavigation);
