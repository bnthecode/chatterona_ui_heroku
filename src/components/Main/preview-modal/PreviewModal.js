import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Paper, Typography } from "@material-ui/core";
import {
  ArrowLeft,
  ArrowLeftOutlined,
  ArrowRightAlt,
} from "@material-ui/icons";
import serverService from "../../../http/servers-http";

const PreviewModal = ({ tempServer, goBack,
  addUserToServer }) => {
  return tempServer ? (
    <Paper
      style={{
        position: "fixed",
        zIndex: 6000,
        left: 72,
        height: 34,
        width: "100%",
        borderRadius: "8px 0px 0px 0px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#4e5d94",
        padding: 4,
      }}
    >
      <Button
      onClick={goBack}
        style={{
          maxHeight: 24,
          width: 80,
          marginLeft: 8,
          textTransform: "none",
          color: "white",
          borderColor: "white",
          padding: 4,
        }}
        variant="outlined"
      >
        <ArrowRightAlt
          style={{ marginRight: 4, transform: "rotate(180deg)" }}
        ></ArrowRightAlt>
        Back
      </Button>

      <Typography style={{ margin: "auto", color: "white", fontWeight: 600 }}>
        {" "}
        You are currently in preview mode. Join this server to start chatting!
        <Button
        onClick={() => addUserToServer(tempServer.id)}
          style={{
            maxHeight: 24,
            marginLeft: 12,
            textTransform: "none",
            color: "white",
            borderColor: "white",
            padding: 12,
          }}
          variant="outlined"
        >
          Join {tempServer.name}
        </Button>
      </Typography>
    </Paper>
  ) : (
    ""
  );
};

export default PreviewModal;
