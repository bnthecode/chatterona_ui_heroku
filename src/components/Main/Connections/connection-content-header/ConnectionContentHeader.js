import { faUserFriends, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import { useState } from "react";

const ConnectionContentHeader = () => {
  const listItems = ["Online", "All", "Pending", "Blocked"];
  const [selected, setSelected] = useState("Online");


  const handleTabChange = (tab) => {
      setSelected(tab);
  }
  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography style={{ fontWeight: 600 }}>
        <FontAwesomeIcon
          style={{ color: "grey", marginRight: 6 }}
          icon={faUsers}
        />
        Friends
      </Typography>

      {listItems.map((item) => (
        <Typography
        onClick={() => handleTabChange(item)}
          style={{
            fontWeight: 600,
            paddingLeft: 6,
            paddingRight: 6,
            borderRadius: 4,
            cursor: "pointer",
            backgroundColor: selected === item ? "rgba(79,84,92,0.5)" : 'transparent',
          }}
        >
          {item}
        </Typography>
      ))}
      <Typography
          style={{
            fontWeight: 600,
            paddingLeft: 6,
            paddingRight: 6,
            borderRadius: 4,
            cursor: "pointer",
            backgroundColor: "#43b581",
          }}
        >
          Add Friend
        </Typography>
    </div>
  );
};
export default ConnectionContentHeader;
// light: "#202225",
// main: "#36393f",
// dark: "#202225",