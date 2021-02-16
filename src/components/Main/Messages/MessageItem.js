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
  hoverItem: {
    padding: 2,
    "&:hover": {
      backgroundColor: "rgb(47,49,54, .4)",
    },
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
  const roleColors = ["#71368A","#2ECC71", "#F1C40F" ]

  const toggleEmojiPicker = (i) => {
    showEmojiPicker({ [i]: !emojiPickerOpen[i] });
  };
  return (
    <div>
      <Paper
        elevation={0}
        style={{
          minHeight: 40,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: 14,
          backgroundColor: "transparent",
          overflowY: "auto",
          width: "90%",
          position: "relative",
        }}
      >
        <Paper
          style={{
            backgroundImage: `url(${
              message.author ? message.author.photoURL : ""
            })`,
            borderRadius: 20,
            backgroundSize: "contain",
            height: 40,
            width: 40,
          }}
        ></Paper>
        <Typography
          style={{
            fontSize: 14,
            marginLeft: 22,
            width: "100%",
            color: "white",
            fontWeight: 600,
          }}
        >
          <Typography
            style={{
              fontSize: "1rem",

              color: roleColors[1],
              fontWeight: 500,
              lineHeight: "1.375rem",
            }}
          >
            {" "}
            {message.author.username}
            <span
              style={{
                fontSize: 10,

                color: "grey",
                fontWeight: 500,
                marginLeft: 16,
              }}
            >
              {moment(message.date).calendar()}
            </span>
          </Typography>
          <div style={{ width: "100%" }}>
            {message.content.map((content, i) => (
              <Paper
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
          </div>
        </Typography>
      </Paper>
    </div>
  );
};

export default MessageItem;
