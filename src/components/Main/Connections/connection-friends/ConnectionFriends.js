import { faCommentAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Paper, Typography } from "@material-ui/core";
import Avatar from "../../../_reusable/Avatar";

const ConnectionFriends = ({ friends, headerFilter = "Online" }) => {


  const friendsList = headerFilter !== 'All' ? friends.filter(friend => friend.status === headerFilter) : friends;
  
  const buildFriendsList = () =>
    friendsList.map((friend) => (
      <Paper
        square
        elevation={0}
        style={{
          backgroundColor: "transparent",
          height: 60,
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderBottom: "1px solid rgb(128,128,128, 0.4)",
        }}
      >
        <Avatar
          status={friend.status}
          backgroundURL={friend.photoURL}
          size="xs"
        ></Avatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            style={{
              fontSize: 14,
              marginLeft: 8,
              fontWeight: 700,
              color: "lightgrey",
            }}
          >
            {friend.username}
          </Typography>
          <Typography
            style={{
              fontSize: 12,
              marginLeft: 8,
              fontWeight: 600,
              color: "lightgrey",
            }}
          >
            {friend.status}
          </Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button
            style={{
              borderRadius: 20,
              minHeight: 40,
              minWidth: 40,
              margin: 8,
              backgroundColor: "#2f3136",
              color: 'lightgrey'
            }}
          >
          <FontAwesomeIcon icon={faCommentAlt} />
          </Button>
          <Button
            style={{
              borderRadius: 20,
              minHeight: 40,
              minWidth: 40,
              margin: 8,
              backgroundColor: "#2f3136",
              color: 'lightgrey'
            }}
          >
           <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </div>
      </Paper>
    ));

  return (
    <div
      style={{ paddingLeft: 16, paddingRight: 16, width: "calc(100% - 32px)" }}
    >
      <Paper
        square
        elevation={0}
        style={{
          backgroundColor: "transparent",
          height: 30,
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderBottom: "1px solid rgb(128,128,128, 0.4)",
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "lightgrey",
          }}
        >
          {headerFilter} - {friendsList.length}
        </Typography>
      </Paper>

      {buildFriendsList()}
    </div>
  );
};

export default ConnectionFriends;
