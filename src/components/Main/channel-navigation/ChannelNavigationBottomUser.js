import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  faCog,
  faHeadphones,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { truncateString } from "../../../utilities/global-utilities";
import Avatar from "../../_reusable/Avatar";
import ChannelNavigationVoiceConnected from "./ChannelNavigationVoiceConnected";

const useStyles = makeStyles(() => ({
  mainPaper: {
    position: "absolute",
    backgroundColor: "#292b2f",
    bottom: 0,
    left: 74,

    width: "calc(100% - 74px)",
    display: "flex",
    flexDirection: "column",
  },
  userSection: {
    backgroundColor: "#292b2f",
    bottom: 0,
    left: 74,
    padding: 2,
    display: "flex",
    flexDirection: "column",
  },
  activeIcon: {
    height: 10,
    width: 10,
    border: "3px solid #2f3136",
    backgroundColor: "#20b673",
    borderRadius: 12,
    position: "absolute",
    bottom: -2,
    left: 16,
  },
  userWrapper: {
    width: "100%",
    border: "1px solid white",
    display: "flex",
  },
  flexContainer: {
    marginLeft: "auto",
  },
  iconBtn: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    margin: 2,
  },
  icon: {
    color: "grey",
    fontSize: 16,
  },
}));

const ChannelNavigationBottomUser = ({
  username,
  userPhoto,
  navigateToUserSettings,
  voiceConnected
}) => {
  const classes = useStyles();
  return (
    <Paper square className={classes.mainPaper}>
    { voiceConnected ? <ChannelNavigationVoiceConnected /> : '' }
      <Paper className={classes.userSection}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
          status="Online"
          size="xs"
            backgroundURL={userPhoto}

          />
   
          <div
            style={{
              display: "flex",
              marginLeft: 4,
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                flexGrow: 1,
                fontSize: 12,
                color: "#fff",
                fontWeight: 800,
              }}
            >
              {truncateString(username || "no one", 8)}
            </Typography>
            <span style={{ fontSize: 10, color: "grey", fontWeight: 700 }}>
              #3737
            </span>
          </div>
          <div className={classes.flexContainer}>
            <Button className={classes.iconBtn}>
              <FontAwesomeIcon className={classes.icon} icon={faMicrophone} />
            </Button>
            <Button className={classes.iconBtn}>
              <FontAwesomeIcon className={classes.icon} icon={faHeadphones} />
            </Button>
            <Button className={classes.iconBtn}>
              <FontAwesomeIcon
                onClick={navigateToUserSettings}
                className={classes.icon}
                icon={faCog}
              />
            </Button>
          </div>
        </div>
      </Paper>
    </Paper>
  );
};

export default ChannelNavigationBottomUser;
