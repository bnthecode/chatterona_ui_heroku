import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import MyAccount from "../../components/UserSettings/MyAccount";
import PrivacyAndSafety from "../../components/UserSettings/PrivacyAndSafety";
import AuthorizedApps from "../../components/UserSettings/AuthorizedApps";
import Connections from "../../components/UserSettings/Connections";
import Subscriptions from "../../components/UserSettings/Subscriptions";
import ServerBoost from "../../components/UserSettings/ServerBoost";
import GiftInventory from "../../components/UserSettings/GiftInventory";
import Billing from "../../components/UserSettings/Billing";
import VoiceAndVideo from "../../components/UserSettings/VoiceAndVideo";
import TextAndImages from "../../components/UserSettings/TextAndImages";
import Appearance from "../../components/UserSettings/Appearance";
import Notifications from "../../components/UserSettings/Notifications";
import Keybinds from "../../components/UserSettings/Keybinds";
import Language from "../../components/UserSettings/Language";
import StreamerMode from "../../components/UserSettings/StreamerMode";
import ChangeLog from "../../components/UserSettings/ChangeLog";
import HypeSquad from "../../components/UserSettings/HypeSquad";
import LogOut from "../../components/UserSettings/LogOut";

import Drawer from "../../components/_reusable/Drawer";
import List from "../../components/_reusable/List";
import { Button, Grow, Slide } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.dark,
    },
    "::-webkit-scrollbar": {
      width: "4px",
    },
  },
  pageContainer: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "row",
  },
  drawer: {
    zIndex: 2000,
    backgroundColor: "#2f3136",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "30%",
    overflow: "auto",
  },
  listClass: {
    marginTop: 64,
    width: 200,
  },
  listItemText: {
    fontSize: "1rem",
  },
  backButton: {
    position: "fixed",
    maxHeight: 40,
    minHeight: 40,
    maxWidth: 40,
    minWidth: 40,
    borderRadius: 20,
    border: "1px solid lightgrey",
    color: "lightgrey",
    fontSize: 16,
    top: 70,
    right: 140,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

const listItems = [
  { name: "My Account", header: "user settings", Component: MyAccount },
  { name: "Privacy & Safety", Component: PrivacyAndSafety },
  { name: "Authorized Apps", Component: AuthorizedApps },
  { name: "Connections", break: true, Component: Connections },

  {
    name: "Subscriptions",
    header: "billing settings",
    style: { color: "#677BC4" },
    Component: Subscriptions,
  },
  { name: "Server Boost", Component: ServerBoost },
  { name: "Gift Inventory", Component: GiftInventory },
  { name: "Billing", break: true, Component: Billing },

  { name: "Voice & Video", header: "app settings", Component: VoiceAndVideo },
  { name: "Text & Images", Component: TextAndImages },
  { name: "Appearance", Component: Appearance },
  { name: "Notifications", Component: Notifications },
  { name: "Keybinds", Component: Keybinds },
  { name: "Language", Component: Language },
  { name: "Stremer Mode", break: true, Component: StreamerMode },

  { name: "Change Log", Component: ChangeLog },
  { name: "HypeSquad", break: true, Component: HypeSquad },
  {
    name: "Log Out",
    style: { color: "red" },
    break: true,
    Component: LogOut,
  },
];

class UserSettings extends PureComponent {
  state = {
    selectedPage: listItems[0],
  };

  handleSelect = (name) => {
    const selectedPage = listItems.find((item) => item.name === name);
    this.setState({ selectedPage });
  };

  render() {
    const { classes, history } = this.props;
    const { selectedPage } = this.state;
    const { Component } = selectedPage;
    return (
      <Grow in timeout={500}>
        <div className={classes.pageContainer}>
          <Drawer className={classes.drawer}>
            <List
              listItemProps={{
                listItemClass: classes.listItem,
                textClass: classes.listItemText,
                handleSelect: this.handleSelect,
              }}
              listProps={{
                listClass: classes.listClass,
                listItems: listItems,
                headerProps: {},
              }}
              style={{ padding: 2 }}
            ></List>
          </Drawer>
          <div
            style={{
              zIndex: 2000,
              position: "absolute",
              left: "30%",
              paddingTop: 70,
              paddingLeft: 36,
              width: "calc(70% - 130px)",
            }}
          >
            <Button
              onClick={() => history.goBack()}
              variant="contained"
              className={classes.backButton}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </Button>
            <Slide in direction="left" timeout={1000}>
              <div>
                {" "}
                <Component />
              </div>
            </Slide>
          </div>
        </div>
      </Grow>
    );
  }
}

export default withStyles(styles)(UserSettings);
