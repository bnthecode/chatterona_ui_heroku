import { Paper } from "@material-ui/core";

const ChannelHeader = ({ children }) => {
  return (
    <Paper
      elevation={0}
      style={{
        cursor: "pointer",
        position: "relative",
        height: 46,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#2f3136",
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      {children}
    </Paper>
  );
};

export default ChannelHeader;
