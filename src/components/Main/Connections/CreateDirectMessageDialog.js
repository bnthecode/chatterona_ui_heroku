import { faCheck, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
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
import Avatar from "../../_reusable/Avatar";
import Dialog from "../../_reusable/Dialog";

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
    height: 212,
    padding: 16,
    overflow: "auto",
  },
  input: {
    backgroundColor: theme.palette.primary.dark,
    color: "lightgrey",
    fontWeight: 500,
    height: 42,
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
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 40,
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
  addButton: {
    marginLeft: "auto",
    color: "#43b581",
    textTransform: "none",
    transition: ".75s all",
    border: "1px solid #43b581",
    marginRight: 8,
    height: 32,
    width: 32,
    minWidth: 32,
    maxWidth: 32,
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
  createDMBtn: {
    width: "100%",
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
const CreateDirectMessageDialog = ({
  handleClose,
  createDirectMessage,
  friends,
  open,
}) => {
  const classes = useStyles();

  const [filtered, setFiltered] = useState(friends || []);

  const [addedFriends, setAddedFriends] = useState([]);

  const handleAddFriend = (friendId) => {
    const alreadyAdded = addedFriends.includes(friendId);
    const newList = [...addedFriends, friendId];
    setAddedFriends([
      ...(alreadyAdded
        ? newList.filter((f) => f !== friendId)
        : newList),
    ]);
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
      const added = addedFriends.includes(friend.id);
      return (
        <Paper elevation={0} className={classes.friendItem}>
          <Avatar size="md" backgroundURL={friend.photoURL} />
          <Typography className={classes.friendText}>
            {friend.username}
          </Typography>
          <Button
            // disabled={added}
            onClick={() => handleAddFriend(friend.id)}
            className={classes.addButton}
          >
            {added ? <FontAwesomeIcon icon={faCheck} /> : ""}
          </Button>
        </Paper>
      );
    });
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      {/* header */}
      <Paper square className={classes.header}>
        <Typography className={classes.headerText}>Create Group DM</Typography>
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
        <Button
          disabled={!addedFriends.length}
          onClick={() => {
            createDirectMessage({ to: addedFriends[0] });
          }}
          variant="contained"
          color="secondary"
          className={clsx([classes.createDMBtn])}
        >
          Create Group DM
        </Button>
      </Paper>
    </Dialog>
  );
};
export default CreateDirectMessageDialog;
