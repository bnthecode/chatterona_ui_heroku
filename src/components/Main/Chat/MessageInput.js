import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { memo, useState } from "react";
import { emojiMap } from "../../../constants/emojis";
import { validateUrl } from "../../../utilities/global-utilities";

const useStyles = makeStyles((theme) => ({
  input2: {
    height: 10,
    fontSize: "1rem",
    borderRadius: 12,
    borderWidth: 0,
    outline: 0,
    "&::placeholder": {
      color: "#fff",
    },
    "&:focus": {
      outline: 0,
    },
    color: "#dcddde",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  input: {
    backgroundColor: "#40444b",
    width: "calc(100% - 16px)",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    color: "#dcddde",
  },

  btn: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    "&:focus": {
      outline: "none",
      border: "none",
      backgroundColor: "transparent",
    },
  },
  icon: {
    color: "grey",
    fontWeight: 400,
    fontSize: 20,
    marginRight: 16,
  },
  link: {
    color: "#2196f3",
  },
}));

const MessageInput = ({ addMessageToChannel, sendWebsocketChannelTyper }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [messageType, setMessageType] = useState("text");

  const parseMessage = (message) => {
    const emojiRegex = /:-?\)/;
    const splitMessage = message.split(" ");
    const emojis = splitMessage
      .map((msg, i) => ({ msg, replace: emojiRegex.test(msg), i }));
    const newMessageString = emojis.reduce((acc, item) => {
      if (item.replace) {
        acc[item.i] = emojiMap[item.msg];
      }
      return acc;
    }, splitMessage);
    return newMessageString.join(" ");
  };

  const handleTyping = (value) => {
    const type = validateUrl(value);
    setMessage(value);
    setMessageType(type);
    if (value.length > 1 && value.length < 3) sendWebsocketChannelTyper();
  };
  const handleSubmit = async () => {
    const parsedMessage = parseMessage(message);
    setLoader(true);
    setMessage("");
    await addMessageToChannel(parsedMessage, messageType);
    setLoader(false);
  };

  return (
    <TextField
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          input:
            messageType === "link"
              ? clsx([classes.input2, classes.link])
              : classes.input2,
          focused: classes.cssFocused,
        },
        startAdornment: (
          <div style={{ display: "grid" }}>
            <button className={classes.btn} id="plus">
              <FontAwesomeIcon
                className={classes.icon}
                icon={faPlusCircle}
              ></FontAwesomeIcon>
            </button>
            <input id="upload-message-img" hidden type="file" />
          </div>
        ),
      }}
      style={{ fontSize: "24px" }}
      variant="outlined"
      placeholder={
        loader ? `I'm trying to speed this up...` : `Message # name....`
      }
      autoFocus
      onKeyPress={(e) => (e.key === "Enter" ? handleSubmit() : null)}
      onChange={({ target: { value } }) => handleTyping(value)}
      value={message}
      className={classes.input}
    />
  );
};

export default memo(MessageInput);
