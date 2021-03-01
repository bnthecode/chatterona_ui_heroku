import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import CreateChannelDialog from "./CreateChannelDialog";
import { List, ListItem, Typography } from "@material-ui/core";
import {
  faHashtag,
  faPlus,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import CollapsableListItem from "../../../_reusable/CollapsableListItem";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ServerChannelHeader from "./ServerChannelHeader";
import { truncateString } from "../../../../utilities/global-utilities";
import Avatar from "../../../_reusable/Avatar";

const useStyles = makeStyles(() => ({
  drawer: { backgroundColor: "#2f3136", width: "310px" },
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  wrapper: { width: "100%" },
  customClass: {
    "&:focus": {
      backgroundColor: "transparent",
      color: 'white'
    },
  },
}));

const ServerChannels = ({
  categories,
  channelId,
  selectChannel,
  createChannel,
  inviteUsers,
  serverName,
  friends,
}) => {
  const [collapsed, setCollapsed] = useState([]);

  const handleCollapse = (index, e) => {
    setCollapsed({ ...collapsed, [index]: !collapsed[index] });
  };

  useEffect(() => {
    // if (channels.length && partitionedChannels[0].length) {
    //   const collapseId = partitionedChannels.findIndex(
    //     (arr) => arr[0].type === currentChannel.type
    //   );
    //   setCollapsed({ ...collapsed, [collapseId]: true });
    // }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  const [showChannelDialog, setChannelDialogOpen] = useState(false);
  const [channelType, setChannelType] = useState("text");
  const [categoryId, setCategoryId] = useState(null);

  const handleAddChannel = async (channel) => {
    createChannel(categoryId, channel);
    setChannelDialogOpen(false);
  };

  return categories.length ? (
    <div className={classes.wrapper}>
      <ServerChannelHeader
        inviteUsers={inviteUsers}
        serverName={serverName}
        friends={friends}
      />
      <List>
        {categories.map((category, i) => (
          <>
            <CollapsableListItem
              style={{ height: 32 }}
              onClick={(e) => {
                handleCollapse(i, e);
              }}
              iconLeft={
                collapsed[i] ? (
                  <KeyboardArrowRight style={{ fontSize: 18 }} />
                ) : (
                  <KeyboardArrowDown style={{ fontSize: 18 }} />
                )
              }
              iconRight={{
                icon: faPlus,
                onClick: () => {
                  setCategoryId(category.id || category._id);
                  setChannelType(category.channels[0].type);
                  setChannelDialogOpen(true);
                },
                title: "Create Channel",
              }}
              item={{}}
              title={
                <span
                  id={`header-${category.name}`}
                  style={{ marginLeft: 2 }}
                >{`${category.name.toUpperCase()}`}</span>
              }
              header
            />
            {category.channels.map((channel) => (
              <CollapsableListItem
                selected={channelId === channel.id}
                onClick={() => selectChannel(channel)}
                style={{
                  display:
                    collapsed[i] === true && channelId !== channel.id
                      ? "none"
                      : "flex",
                  height: 32,
                }}
                customClass={channel.type === 'voice' ? classes.customClass : ''}
                iconLeft={
                  channel.type === "text" ? (
                    <FontAwesomeIcon icon={faHashtag} style={{ width: 20 }} />
                  ) : (
                    <FontAwesomeIcon style={{ width: 20 }} icon={faVolumeUp} />
                  )
                }
                title={
                  <span style={{ marginLeft: 10 }}>
                    {truncateString(channel.name, 20) || "nameless channel :("}
                  </span>
                }
                id="123"
              >
                {/* when people connect voices */}
                {/* <ListItem style={{ marginLeft: 30, height: 32}}>
                  <Avatar hideStatus size="xxs"></Avatar>
                  <Typography style={{ color: 'grey', fontSize: 14, fontWeight: 600}}>bnthe</Typography>
                </ListItem> */}
                </CollapsableListItem>
            ))}
          </>
        ))}

        <div
          style={{ overflow: "auto", maxHeight: "calc(100vh - 290px)" }}
        ></div>

        <CreateChannelDialog
          setChannelDialogOpen={setChannelDialogOpen}
          open={showChannelDialog}
          handleAddChannel={handleAddChannel}
          type={channelType}
        />
      </List>
    </div>
  ) : (
    <div />
  );
};

export default ServerChannels;
