import {
  faPlus,
  faTachometerAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, List, Paper, Typography } from "@material-ui/core";
import { ChevronLeft, Message, PeopleAlt, Speed } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import channelsHttp from "../../../../http/channels-http";
import Avatar from "../../../_reusable/Avatar";
import CollapsableListItem from "../../../_reusable/CollapsableListItem";
import CreateDirectMessageDialog from "../CreateDirectMessageDialog";

const useStyles = makeStyles(() => ({
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  avatar: { marginLeft: -12 },
  icon: {
    "&:hover": {
      color: "red",
    },
    position: "absolute",
    right: 8,
  },
  list: {},
}));

const ConnectionChannels = ({
  channels,
  selectChannel,
  createChannel,
  userId,
  channelId,
  friends,
}) => {
  const classes = useStyles();

  const [directMessageDialogOpen, setDirectMessageDialog] = useState(false);

  const createDirectMessage = (channel) => {
    createChannel(channel);
    setDirectMessageDialog(false);
  }
  return channels.length && (
    <>
      <List className={classes.list}>
        <CollapsableListItem
          style={{ height: 48 }}
     
          iconLeft={<PeopleAlt style={{ fontSize: 24, marginRight: 16 }} />}
          item={{}}
          title={<span style={{ fontSize: 16 }}>Friends</span>}
        />

        <CollapsableListItem
          style={{ height: 48 }}
          iconLeft={<Speed style={{ fontSize: 24, marginRight: 16,}} />}
          item={{}}
          title={<span style={{ fontSize: 16 }}>Nitro</span>}
        />
        <CollapsableListItem
          onClick={() => {}}

          iconRight={{
            icon: faPlus,
            onClick: () => {
              setDirectMessageDialog(true)
            },
            title: "Create DM",
          }}
          item={{}}
          title="DIRECT MESSAGES"
          header
        />
        <div style={{ overflow: "auto", maxHeight: "calc(100vh - 290px)" }}>
          {channels && channels.length
            ? channels.map((message) => message.to || message.from ? (
                <CollapsableListItem
                  style={{ height: 48, padding: 0 }}
                  selected={channelId === message.channelId}
                  iconLeft={''}
                  onClick={() => {}}
                  title="Title"
                  id="123"
                  customListItem={
                    <Paper
                      elevation={0}
                      style={{
                        backgroundColor: "transparent",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onClick={() => {
                        selectChannel(message.channelId)
                      }}
                    >
                      <Avatar
                        backgroundURL={
                          message.to.userId === userId
                            ? message.from.photoURL
                            : message.to.photoURL
                        }
                        size="xs"
                      ></Avatar>
                      <Typography
                        style={{
                          fontSize: 14,
                          marginLeft: 8,
                          fontWeight: 600,
                          color: "lightgrey",
                        }}
                      >
                        {message.to.userId === userId
                          ? message.from.username
                          : message.to.username}
                      </Typography>
                    </Paper>
                  }
                  primary
                />
              ) : <div />)
            : ""}
        </div>
        <CreateDirectMessageDialog
          createDirectMessage={createDirectMessage}
          friends={friends}
          open={directMessageDialogOpen}
          handleClose={setDirectMessageDialog}
      />
      </List>
    </>
  );
};

export default  ConnectionChannels;
