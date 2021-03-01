import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { emojioneList } from "emojione";
import DialogItem from "../server/add-server/DialogItem";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    textAlign: "center",
    width: 500,
    height: 640,
    backgroundColor: theme.palette.primary.main,
    padding: 18,
  },

  closeBtn: {
    position: "absolute",
    top: 8,
    right: 12,
    fontSize: 24,
    color: "lightgrey",
    cursor: "pointer",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "lightgrey",
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "grey",
  },
  content: {
    backgroundColor: "transparent",
  },

  footer: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 60,
    backgroundColor: "transparent",
    width: "100%",
  },
  svrImg: {
    height: 60,
    width: 60,
    alignSelf: "center",
    backgroundSize: "contain",
    borderRadius: 15,
  },

  dialogItem: {
    textTransform: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#2f3136",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "#FFF",
    },
    alignItems: "center",
    height: 60,
    width: "100%",
    padding: "0 16px 0 16px",
    margin: 4,
    borderRadius: 8,
  },
  dialogItemIcon: {
    fontSize: 24,
    color: "white",
  },
  flexItemRight: {
    marginRight: 16,
  },
  flexItemLeft: {
    marginLeft: "auto",
    fontSize: 20,
  },
  dialogItemText: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
  subtext: {
    fontSize: 12,
    fontWeight: 500,
    color: "grey",
  },
}));

const JoinNewServerModal = ({
  displayNewServerModal,
  open,
  handleNewChannelSelection,
  server,
}) => {
  const classes = useStyles();
  return open ? (
    <Dialog
      PaperProps={{
        className: classes.paper,
      }}
      open={open}
    >
      <FontAwesomeIcon
        onClick={() => displayNewServerModal(false)}
        className={classes.closeBtn}
        icon={faTimes}
      ></FontAwesomeIcon>

      <img src={server.photoURL} className={classes.svrImg} />
      <DialogTitle>
        <span className={classes.title}>
          Welcome to
          <span style={{ color: "white" }}>{" " + server.name}</span>
        </span>
        <Typography className={classes.secondaryTitle}>
          {server.description}
        </Typography>
      </DialogTitle>
      <Typography
        style={{
          color: "grey",
          fontWeight: 600,
          textTransform: "uppercase",
          alignSelf: "flex-start",
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        Top things to do here
      </Typography>
      <Paper elevation={0} className={classes.content}>
        <Button
          onClick={() => [displayNewServerModal(false),handleNewChannelSelection(server.channels[0]._id)]}
          className={classes.dialogItem}
          variant="outlined"
        >
          <span
            className={clsx([classes.dialogItemIcon, classes.flexItemRight])}
          >
            😀
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Typography className={classes.dialogItemText}>
              Start conversations with other users.
            </Typography>
            <Typography className={classes.subtext}>
              #{server.channels[0].name}
            </Typography>
          </div>
          <FontAwesomeIcon
            className={clsx([classes.dialogItemIcon, classes.flexItemLeft])}
            icon={faChevronRight}
          ></FontAwesomeIcon>
        </Button>
      </Paper>
      <Paper className={classes.footer}>
        <Typography
          onClick={() => displayNewServerModal(false)}
          style={{ color: "lightgrey", cursor: "pointer" }}
        >
          Ill just look around for now
        </Typography>
      </Paper>
    </Dialog>
  ) : (
    ""
  );
};

export default JoinNewServerModal;
