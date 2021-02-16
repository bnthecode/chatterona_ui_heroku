import { Grid, Divider, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import ChannelHeader from "./ChannelHeader";
import CreateChannelDialog from "./CreateChannelDialog";
import Drawer from "../../_reusable/Drawer";
import HeaderOptions from "./HeaderOptions";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import ChannelGroup from "./ChannelGroup";
import ChannelBottomUser from "./ChannelBottomUser";

const useStyles = makeStyles(() => ({
  drawer: { backgroundColor: "#2f3136", width: "310px" },
  wrapper: { paddingLeft: "72px" },
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  list: { width: "100%", margin: 4 },
}));

const Channels = ({
  channels,
  channelId,
  selectChannel,
  createChannel,
  serverName,
  username,
  userPhoto,
  navigateToUserSettings
}) => {
  const classes = useStyles();

  const [headerOptions, showHeaderOptions] = useState(false);
  const [openDropdowns, setDropdownsOpen] = useState({
    text: true,
    voice: true,
  });
  const [showChannelDialog, setChannelDialogOpen] = useState(false);

  const toggleDropdown = (type) => {
    setDropdownsOpen({
      ...openDropdowns,
      [type]: !openDropdowns[type],
    });
  };

  const handleAddChannel = async (channel) => {
    createChannel(channel);
    setChannelDialogOpen({ open: false });
  };

  const toggleHeaderOptions = () => showHeaderOptions(!headerOptions);

  const channelItems = _.partition(channels, { type: "text" });
  const [textChannels, voiceChannels] = channelItems;

  return (
    <Drawer className={classes.drawer} anchor="left">
      <div className={classes.wrapper}>
        <ChannelHeader
          serverName={serverName}
          toggleHeaderOptions={toggleHeaderOptions}
        />
        <Divider className={classes.divider} />
        <Grid container>
          <List className={classes.list}>
            <ChannelGroup
              type="text"
              channels={textChannels}
              headerIconRight={faPlus}
              setChannelDialogOpen={setChannelDialogOpen}
              toggleDropdown={toggleDropdown}
              dropdownValues={openDropdowns}
              listItemClick={selectChannel}
              channelId={channelId}
            />
            <ChannelGroup
              type="voice"
              channels={voiceChannels}
              headerIconRight={faPlus}
              setChannelDialogOpen={setChannelDialogOpen}
              toggleDropdown={toggleDropdown}
              dropdownValues={openDropdowns}
              listItemClick={selectChannel}
              channelId={channelId}
            />
          </List>
        </Grid>
        <ChannelBottomUser
          navigateToUserSettings={navigateToUserSettings}
          username={username}
          userPhoto={userPhoto}
        />
      </div>
      <HeaderOptions headerOptions={headerOptions} />
      <CreateChannelDialog
        showChannelDialog={showChannelDialog}
        handleAddChannel={handleAddChannel}
        setChannelDialogOpen={setChannelDialogOpen}
      />
    </Drawer>
  );
};

export default Channels;
