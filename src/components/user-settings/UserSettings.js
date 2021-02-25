import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import MyAccount from "./MyAccount";
import PrivacyAndSafety from "./PrivacyAndSafety";
import AuthorizedApps from "./AuthorizedApps";
import Connections from "./Connections";
import Subscriptions from "./Subscriptions";
import ServerBoost from "./ServerBoost";
import GiftInventory from "./GiftInventory";
import Billing from "./Billing";
import VoiceAndVideo from "./VoiceAndVideo";
import TextAndImages from "./TextAndImages";
import Appearance from "./Appearance";
import Notifications from "./Notifications";
import Keybinds from "./Keybinds";
import Language from "./Language";
import StreamerMode from "./StreamerMode";
import ChangeLog from "./ChangeLog";
import HypeSquad from "./HypeSquad";
import LogOut from "./LogOut";

import Drawer from "../_reusable/Drawer";
import List from "../_reusable/List";
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
