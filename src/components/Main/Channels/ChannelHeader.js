import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";
import { truncateString } from "../../../utilities/global-utilities";

const ChannelHeader = ({ serverName, toggleHeaderOptions }) => {
  return (
    <Paper
      elevation={0}
      onClick={toggleHeaderOptions}
      style={{
        cursor: "pointer",
        position: "relative",
        height: 46,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#2f3136",
        borderBottom: "1px solid #1e1e1e",
        paddingLeft: 18,
      }}
    >

      <Typography
        style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: 14,
          marginRight: 'auto'
        }}
      >
        {truncateString(serverName, 20)}
      </Typography>
      <FontAwesomeIcon
        icon={faChevronDown}
        style={{
          position: "absolute",
          top: "calc(50% - 8px)",
          right: 18,
          color: "white",
          fontSize: 14,
        }}
      ></FontAwesomeIcon>
    </Paper>
  );
};

export default ChannelHeader;
