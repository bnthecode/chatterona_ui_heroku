import { Paper, Typography } from "@material-ui/core";
import { useState } from "react";

const NoMessagesDisplay = () => {
  const [render, setRender] = useState(false);
  setTimeout(() => {
    setRender(true);
  }, 1000);
  return render ? (
    <Paper
      style={{
        minHeight: 40,
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 72px)",
        margin: 12,
        padding: 14,
        backgroundColor: "#3a4146",
      }}
    >
      <Paper
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1503797558227-76451ba6de08?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGdvYXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
          borderRadius: 20,
          backgroundSize: "contain",
          height: 40,
          width: 40,
        }}
      ></Paper>
      <Typography
        style={{
          fontSize: 14,
          marginLeft: 14,
          marginTop: 8,
          color: "white",
          fontWeight: 600,
        }}
      >
        No messages in this channel! Send one to start a conversation.
      </Typography>
    </Paper>
  ) : (
    <div />
  );
};

export default NoMessagesDisplay;
