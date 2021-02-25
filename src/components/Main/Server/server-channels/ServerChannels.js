import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import CreateChannelDialog from "./CreateChannelDialog";
import { List } from "@material-ui/core";
import {
  faHashtag,
  faPlus,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import CollapsableListItem from "../../../_reusable/CollapsableListItem";
import _ from "lodash";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ServerChannelHeader from "./ServerChannelHeader";

const useStyles = makeStyles(() => ({
  drawer: { backgroundColor: "#2f3136", width: "310px" },
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  wrapper: { width: "100%" },
}));

const ServerChannels = ({
  channels,
  channelId,
  selectChannel,
  createChannel,
  inviteUsers,
  serverName,
  friends,
}) => {
  const partitionedChannels = _.partition(channels, { type: "text" });
  const currentChannel = channels.find((c) => c.id === channelId);

  const [collapsed, setCollapsed] = useState([]);

  const handleCollapse = (index) => {
    setCollapsed({ ...collapsed, [index]: !collapsed[index] });
  };

  useEffect(() => {
    if (channels.length && partitionedChannels[0].length) {
      const collapseId = partitionedChannels.findIndex(
        (arr) => arr[0].type === currentChannel.type
      );
      setCollapsed({ ...collapsed, [collapseId]: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  const [showChannelDialog, setChannelDialogOpen] = useState(false);
  const [channelType, setChannelType] = useState("text");

  const handleAddChannel = async (channel) => {
    createChannel(channel);
    setChannelDialogOpen(false);
  };

  return partitionedChannels[0].length ? (
    <div className={classes.wrapper}>
      <ServerChannelHeader
        inviteUsers={inviteUsers}
        serverName={serverName}
        friends={friends}
      />
      <List>
        {partitionedChannels.map((item, i) =>
          item ? (
            <>
              <CollapsableListItem
                style={{ height: 36 }}
                onClick={() => handleCollapse(i)}
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
                    setChannelType(item[0].type);
                    setChannelDialogOpen(true);
                  },
                  title: "Create Channel",
                }}
                item={{}}
                title={
                  <span
                    style={{ marginLeft: 2 }}
                  >{`${item[0].type.toUpperCase()} CHANNELS`}</span>
                }
                header
              />
              {item.map((channel) => (
                <CollapsableListItem
                  selected={channelId === channel.id}
                  onClick={() => selectChannel(channel.id)}
                  style={{
                    display:
                      collapsed[i] === true && channelId !== channel.id
                        ? "none"
                        : "block",
                  }}
                  iconLeft={
                    channel.type === "text" ? (
                      <FontAwesomeIcon icon={faHashtag} style={{ width: 20 }} />
                    ) : (
                      <FontAwesomeIcon
                        style={{ width: 20 }}
                        icon={faVolumeUp}
                      />
                    )
                  }
                  title={
                    <span style={{ marginLeft: 10 }}>
                      {channel.name || "nameless channel :("}
                    </span>
                  }
                  id="123"
                  primary
                />
              ))}
            </>
          ) : (
            ""
          )
        )}

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
