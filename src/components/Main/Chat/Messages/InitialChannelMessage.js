import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";

const InitialChannelMessage = ({ channel }) => {
  return (
    <Paper
      elevation={0}
      style={{
        height: 140,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 14,
        backgroundColor: "transparent",
        // borderBottom: messages.length ? '1px solid grey' : 'none'
      }}
    >
      <Paper
        style={{
          backgroundColor: "#4f545c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 35,
          width: 70,
          height: 70,
        }}
      >
        <FontAwesomeIcon
          style={{
            fontSize: 42,
            color: "white",
          }}
          icon={faHashtag}
        ></FontAwesomeIcon>
      </Paper>
      <Typography style={{ color: "white", fontSize: 32, fontWeight: 700 }}>
        Welcome to #{channel.name}!
      </Typography>
      <Typography style={{ color: "white", fontSize: 16, color: 'lightgrey' }}>
       This is the start of the #{channel.name} channel.
      </Typography>
    </Paper>
  );
};

export default InitialChannelMessage;
