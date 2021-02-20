import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";
import Avatar from "../../../../_reusable/Avatar";
import Dialog from "../../../../_reusable/Dialog";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "transparent",
    padding: 16,
  },
  headerText: {
    fontSize: 14,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: 700,
    color: "white",
  },

  content: {
    backgroundColor: "transparent",
    height: 200,
    padding: 16,
    overflow: "auto",
  },
  input: {
    backgroundColor: theme.palette.primary.dark,
    color: "lightgrey",
    fontWeight: 500,
    fontSize: 12,
    height: 32,
  },
  linkInput: {
    height: 48,
    fontSize: 14,
    color: "lightgrey",
  },
  muiInput: {
    width: "100%",
  },
  focused: {},
  footer: {
    backgroundColor: "transparent",
    height: 74,
    padding: 16,
  },
  friendItem: {
    backgroundColor: "transparent",
    height: 60,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgba(79,84,92,.3)",
    },
  },
  friendText: {
    marginLeft: 8,
    fontWeight: 600,
    color: "white",
  },
  inviteButton: {
    marginLeft: "auto",
    color: "#43b581",
    textTransform: "none",
    transition: ".75s all",
    border: "1px solid #43b581",
    marginRight: 8,
    "&:hover": {
      backgroundColor: "#43b581",
      color: "white",
    },
    "&:disabled": {
      border: "1px solid grey",
      color: "grey",
      cursor: "not-allowed",
    },
  },
  copyButton: {
    marginRight: -6,
    width: 120,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#677bc4",
      color: "white",
    },
  },
  copiedButton: {
    backgroundColor: "#43b581",
    color: "white",
  },
  copiedTextField: {
    border: "1px solid #43b581",
  },
  footerHeader: {
    textTransform: "uppercase",
    fontWeight: 600,
    padding: 4,
    fontSize: 12,
    marginTop: -14,
    marginBottom: 14,
    color: "lightgrey",
  },
}));
const InvitePeople = ({ handleClose, friends, serverName, inviteUsers }) => {
  const classes = useStyles();

  const [filtered, setFiltered] = useState(friends);
  const [copied, setCopied] = useState(false);
  const [linksSent, setLinksSent] = useState([]);

  const serverLink = "https://chatterona.gg/ab9h7ENG";

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleInviteFriend = async (friendId) => {
    try {
      await inviteUsers(friendId);
      setLinksSent([...linksSent, friendId]);
    } catch {
      alert("problem occured sending invite..");
    }
  };

  const searchFriends = ({ target: { value } }) => {
    setFiltered(
      value.length
        ? friends.filter((n) =>
            n.username.toLowerCase().includes(value.toLowerCase())
          )
        : friends
    );
  };

  const buildFriendsList = () => {
    return filtered.map((friend) => {
      const sent = linksSent.includes(friend.id);
      return (
        <Paper elevation={0} className={classes.friendItem}>
          <Avatar size="md" backgroundURL={friend.photoURL} />
          <Typography className={classes.friendText}>
            {friend.username}
          </Typography>
          <Button
            disabled={sent}
            onClick={() => handleInviteFriend(friend.id)}
            className={classes.inviteButton}
          >
            {sent ? "Sent" : "Invite"}
          </Button>
        </Paper>
      );
    });
  };
  return (
    <Dialog handleClose={handleClose}>
      {/* header */}
      <Paper square className={classes.header}>
        <Typography className={classes.headerText}>
          Invite friends to <span style={{ color: "grey" }}>{serverName}</span>
        </Typography>
        <TextField
          autoFocus={true}
          placeholder="Search for friends"
          // color="secondary"
          InputProps={{
            endAdornment: (
              <FontAwesomeIcon
                style={{
                  color: "grey",
                  marginLeft: 8,
                  fontSize: 16,
                  marginRight: 4,
                }}
                icon={faSearch}
              />
            ),
            className: classes.input,
            focused: classes.focused,
            notchedOutline: classes.notchedOutline,
          }}
          onChange={searchFriends}
          className={classes.muiInput}
          id="username"
          variant="outlined"
        ></TextField>
      </Paper>

      {/* content */}
      <Paper square className={classes.content}>
        {buildFriendsList()}
      </Paper>

      {/* footer */}
      <Paper square className={classes.footer}>
        <Typography className={classes.footerHeader}>
          Or, send a server invite link to a friend
        </Typography>
        <TextField
          autoFocus={true}
          placeholder="Search for friends"
          // color="secondary"
          value={serverLink}
          InputProps={{
            endAdornment: (
              <Button
                onClick={handleCopyClick}
                variant="contained"
                color="secondary"
                className={clsx([
                  classes.copyButton,
                  copied ? classes.copiedButton : "",
                ])}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            ),
            className: clsx([
              classes.input,
              classes.linkInput,
              copied ? classes.copiedTextField : "",
            ]),
            focused: classes.focused,
            notchedOutline: classes.notchedOutline,
          }}
          onChange={searchFriends}
          className={classes.muiInput}
          id="username"
          variant="outlined"
        ></TextField>
      </Paper>
    </Dialog>
  );
};
export default InvitePeople;
