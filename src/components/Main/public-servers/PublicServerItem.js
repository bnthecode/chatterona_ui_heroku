import { faCertificate, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  serverItem: {
    '&:hover': {

    }
  }
}))

const PublicServerItem = ({ server, selectPublicServer }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div style={{ height: 380 }}>
      <Paper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => selectPublicServer(server)}
      elevation={hovering ? 24 : 0}
        style={{
          cursor: 'pointer',
          borderRadius: 10,
          width: "calc(100% - 16px)",
          position: "relative",
          height: "calc(100% - 16px)",
          backgroundColor: "#292b2f",
        }}
      >
        <img
          style={{
            objectFit: "fill",
            borderRadius: "8px 8px 0 0 ",
            height: "50%",
            width: "100%",
          }}
          src={server.photoURL}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            padding: 12,
          }}
        >
          <Typography style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
            <FontAwesomeIcon
              style={{
                color: server.verified ? "#43b581" : "#7289da",
                fontSize: 16,
                marginRight: 6,
              }}
              icon={faCertificate}
            ></FontAwesomeIcon>
            {server.name}{" "}
          </Typography>
          <Typography style={{ fontSize: 14, color: "lightgrey" }}>
            {server.description}{" "}
          </Typography>
        </div>
        <Paper
          style={{
            position: "absolute",
            bottom: 0,
            color: "lightgrey",
            height: 40,
            width: "100%",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 8,
            display: "flex",
            fontSize: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              
            }}
          >
            <FontAwesomeIcon
              style={{ color: "#43b581" }}
              icon={faCircle}
            ></FontAwesomeIcon>
            <Typography style={{ fontSize: 12, marginLeft: 8}}>{server.users.length} Online</Typography>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "grey", }}
              icon={faCircle}
            ></FontAwesomeIcon>
            <Typography style={{ fontSize: 12, marginLeft: 8}}>{server.users.length} Members</Typography>
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

export default PublicServerItem;
