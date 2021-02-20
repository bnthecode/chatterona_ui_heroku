import { faChevronUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import CreateChannelDialog from "./CreateChannelDialog";
import ChangeNickname from "./HeaderOptions/ChangeNickname";
import CreateCategory from "./HeaderOptions/CreateCategory";
import HeaderOptions from "./HeaderOptions/HeaderOptions";
import InvitePeople from "./HeaderOptions/InvitePeople";
import NotificationSettings from "./HeaderOptions/NotificationSettings";
import PrivacySettings from "./HeaderOptions/PrivacySettings";
import ServerBoost from "./HeaderOptions/ServerBoost";
import ServerSettings from "./HeaderOptions/ServerSettings";

const ServerChannelHeader = ({ serverName, friends = [], inviteUsers }) => {
  const [componentKey, setComponentKey] = useState("");
  const [headerOptions, showHeaderOptions] = useState(false);
  const hideMutedChannels = true;

  const components = {
    server_boost: {
      Component: ServerBoost,
      path: "/server-boost",
      newPage: true,
    },
    invite_people: {
      Component: InvitePeople,
      props: { friends, serverName, inviteUsers },
      newPage: false,
    },
    server_settings: { Component: ServerSettings, newPage: false },
    create_channel: { Component: CreateChannelDialog, newPage: false },
    create_category: { Component: CreateCategory, newPage: false },
    notification_settings: {
      Component: NotificationSettings,
      newPage: false,
    },
    privacy_settings: { Component: PrivacySettings, newPage: false },
    change_nickname: { Component: ChangeNickname, newPage: false },
  };

  const handleChannelOptionSelect = (name) => {
    const key = name.split(" ").join("_").toLowerCase();
    const foundComponent = components[key];

    if (key === "hide_muted_channels") {

      return;
    }
    if (foundComponent && !foundComponent.newPage) {
      return setComponentKey(name.split(" ").join("_").toLowerCase());
    }
  };
  const toggleHeaderOptions = () => showHeaderOptions(!headerOptions);

  const headerOptionProps = {
    handleChannelOptionSelect,
    headerOptions,
    hideMutedChannels,
  };
  const ComponentToLoad = components[componentKey]
    ? components[componentKey].Component
    : null;

  const handleClose = () => {
    setComponentKey("");
  };
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Paper
        elevation={0}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
        }}
        onClick={toggleHeaderOptions}
      >
        <Typography style={{ color: "white", fontSize: 14, flexGrow: 1, fontWeight: 500 }}>
          {serverName}
        </Typography>
        <FontAwesomeIcon
          icon={headerOptions ? faTimes : faChevronUp}
          style={{
            color: "grey",
            alignSelf: "flex-end center",
            marginLeft: "auto",
            transition: ".25s all",
            transform: `rotate(${headerOptions ? 0 : 180}deg)`,
          }}
        ></FontAwesomeIcon>
      </Paper>
      <HeaderOptions {...headerOptionProps} />

      {ComponentToLoad ? (
        <ComponentToLoad
          {...components[componentKey].props}
          handleClose={handleClose}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ServerChannelHeader;
