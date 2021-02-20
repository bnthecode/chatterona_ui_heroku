import {
  faEllipsisH,
  faLaughBeam,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import MessageItemImage from "./MessageItemImage";
import MessageItemLink from "./MessageItemLink";
import MessageItemText from "./MessageItemText";

const useStyles = makeStyles(() => ({
  chatItem: {
    backgroundColor: "transparent",
    color: "#eee",
    position: "relative",
  },
  messageWrapper: {
    minHeight: 40,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 14,
    backgroundColor: "transparent",
    overflowY: "auto",
    width: "90%",
    position: "relative",
  },
  avatar: {
    borderRadius: 20,
    backgroundSize: "contain",
    minHeight: 40,
    minWidth: 40,
    height: 40,
    width: 40,
  },
  userText:{
    fontSize: "14px",

    color: "#71368A",
    fontWeight: 700,
  },
  hoverItem: {
    padding: 2,
    "&:hover": {
      backgroundColor: "rgb(47,49,54, .4)",
    },
  },
  dateText: {
    fontSize: 10,
    fontWeight: 700,
    color: "grey",

    marginLeft: 16,
  },
  contentWrapper: {
    backgroundColor: "transparent",
    width: "100%",
    marginLeft: 22,
  },
  actionBadge: {
    backgroundColor: "#2f3136",
    borderRadius: 8,
    position: "absolute",
    top: -35,
    right: -15,
    width: 100,
    height: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  emojiIcon: {
    fontSize: 20,
    cursor: "pointer",
    color: "white",
  },
}));
const MessageItem = ({ message }) => {
  const classes = useStyles();
  const components = {
    image: MessageItemImage,
    link: MessageItemLink,
    text: MessageItemText,
  };

  const determineMessageType = (content) => {
    const isImage = content.type ? content.type.includes("image") : false;
    const isText = content.type === "text";
    const isExternalLink = content.type.includes("text/html");
    const component = [
      { name: "image", active: isImage },
      { name: "text", active: isText },
      { name: "link", active: isExternalLink },
    ].find((n) => n.active);

    const Component = component
      ? components[component.name]
      : components["text"];

    return <Component content={content} />;
  };
  const [showMsgActions, displayMessageActions] = useState(false);
  const [emojiPickerOpen, showEmojiPicker] = useState(false);

  const showActions = (i) => {
    displayMessageActions({ [i]: !showMsgActions[i] });
  };

  const toggleEmojiPicker = (i) => {
    showEmojiPicker({ [i]: !emojiPickerOpen[i] });
  };
  return (
    <div>
      <Paper elevation={0} className={classes.messageWrapper}>
        <Paper
          className={classes.avatar}
          style={{
            backgroundImage: `url(${
              message.author ? message.author.photoURL : ""
            })`,
          }}
        />
        <Paper elevation={0} className={classes.contentWrapper}>
          <Typography className={classes.userText}>
            {message.author.username}
            <span className={classes.dateText}>
              {moment(message.date).calendar()}
            </span>
          </Typography>

          {message.content.map((content, i) => (
            <Paper
              key={`${content.name}_${i}`}
              onMouseEnter={() => showActions(i)}
              onMouseLeave={() => showActions(i)}
              elevation={0}
              className={classes.chatItem}
            >
              <div className={classes.hoverItem}>
                {showMsgActions[i] && (
                  <div className={classes.actionBadge}>
                    <FontAwesomeIcon
                      onClick={() => toggleEmojiPicker(i)}
                      className={classes.emojiIcon}
                      icon={faLaughBeam}
                    />
                    <FontAwesomeIcon
                      className={classes.emojiIcon}
                      icon={faPencilAlt}
                    />
                    <FontAwesomeIcon
                      className={classes.emojiIcon}
                      icon={faEllipsisH}
                    />
                  </div>
                )}
                {determineMessageType(content)}
              </div>
              <EmojiPicker
                open={emojiPickerOpen[i]}
                toggleEmojiPicker={toggleEmojiPicker}
              />
            </Paper>
          ))}
        </Paper>
      </Paper>
    </div>
  );
};

export default MessageItem;
