import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { List, Paper, Typography } from "@material-ui/core";
import { PeopleAlt, Speed } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Avatar from "../../../_reusable/Avatar";
import CollapsableListItem from "../../../_reusable/CollapsableListItem";
import CreateDirectMessageDialog from "../CreateDirectMessageDialog";
import ConnectionChannelHeader from "./ConnectionHeader";

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
  directMessages,
  selectDirectMessage,
  createDirectMessage,
  userId,
  friends,
  selectListItem,
}) => {
  const classes = useStyles();

  const [directMessageDialogOpen, setDirectMessageDialog] = useState(false);
  const [selected, setSelected] = useState("Friends");

  const handleDirectMessage = (dm) => {
    createDirectMessage(dm);
    setDirectMessageDialog(false);
  };

  return (
    <>
      <ConnectionChannelHeader />
      <List className={classes.list}>
        <CollapsableListItem
          style={{ height: 42 }}
          onClick={() => [selectListItem("@me"), setSelected("Friends")]}
          selected={selected === "Friends"}
          iconLeft={<PeopleAlt style={{ fontSize: 24, marginRight: 16 }} />}
          item={{}}
          title={<span style={{ fontSize: 16 }}>Friends</span>}
        />

        <CollapsableListItem
          style={{ height: 42 }}
          onClick={() => [selectListItem("nitro"), setSelected("Nitro")]}
          iconLeft={<Speed style={{ fontSize: 24, marginRight: 16 }} />}
          selected={selected === "Nitro"}
          item={{}}
          title={<span style={{ fontSize: 16 }}>Nitro</span>}
        />
        <CollapsableListItem
          onClick={() => {}}
          iconRight={{
            icon: faPlus,
            onClick: () => {
              setDirectMessageDialog(true);
            },
            title: "Create DM",
          }}
          item={{}}
          title="DIRECT MESSAGES"
          header
        />
        <div style={{ overflow: "auto", maxHeight: "calc(100vh - 290px)" }}>
          {directMessages && directMessages.length
            ? directMessages.map((dm) =>
            dm.to || dm.from ? (
                  <CollapsableListItem
                    style={{ height: 42, padding: 0 }}
                    selected={selected === dm.channelId}
                    iconLeft={""}
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
                        onClick={() => [
                          selectDirectMessage(dm),
                          setSelected(dm.channelId),
                        ]}
                      >
                        <Avatar
                          backgroundURL={
                            dm.to.userId === userId
                              ? dm.from.photoURL
                              : dm.to.photoURL
                          }
                          size="xs"
                          status={dm.to.userId === userId
                            ? dm.from.status
                            : dm.to.status}
                        ></Avatar>
                        <Typography
                          style={{
                            fontSize: 14,
                            marginLeft: 8,
                            fontWeight: 600,
                            color: "lightgrey",
                          }}
                        >
                          {dm.to.userId === userId
                            ? dm.from.username
                            : dm.to.username}
                        </Typography>
                      </Paper>
                    }
                  />
                ) : (
                  <div />
                )
              )
            : ""}
        </div>
        <CreateDirectMessageDialog
          handleDirectMessage={handleDirectMessage}
          friends={friends}
          open={directMessageDialogOpen}
          handleClose={setDirectMessageDialog}
        />
      </List>
    </>
  );
};

export default ConnectionChannels;
