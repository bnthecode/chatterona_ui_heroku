import {
  makeStyles, Paper, Typography,
} from "@material-ui/core";

import Drawer from "../../_reusable/Drawer";

const useStyles = makeStyles(() => ({
  drawer: {
      position: 'absolute',
      top: 46,
    width: 240,
    alignItems: 'center',
    height: 'calc(100vh - 48px)',
    backgroundColor: "#2f3136",
  },
  nameSpan: {
    whiteSpace: "nowrap",
  },
  bottomSpacer: {
    height: 12,
    width: 12,
    position: "absolute",
  
    bottom: 0,
    left: 24,
    border: "2px solid #2f3136",
    backgroundColor: "#20b673",
    borderRadius: 10,
  },
  userItem: {
    whiteSpace: "nowrap",
    color: 'white',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    margin: 10,
    backgroundColor: "#2f3136",
  },
  bottomPaper: {
    position: "relative",
    minHeight: 40,
    borderRadius: 20,
    backgroundSize: "contain",

    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer",
    height: 40,
    width: 40,
  },
  userText: {
    position: "absolute",
    top: 0,
    left: 50,
    fontSize: 14,
    color: "white",
    fontWeight: 700,
  },
  subtitle: {
    display: 'flex',
    width: '100%',
    fontSize: 10,
    letterSpacing: .1,
    
    color: "grey",
    fontWeight: 700,
    flexWrap: 'nowrap'
  }
}));
const roleColors = ["#71368A","#2ECC71", "#F1C40F" ]

const ServerUsers = ({ users }) => {
  // filter by status
  const classes = useStyles();
  return <Drawer anchor="right" className={classes.drawer}>
    { users.map((user) => <Paper elevation={0} className={classes.userItem}>

    <Paper
            style={{ backgroundImage: `url(${user.photoURL})` }}
            className={classes.bottomPaper}
  
          >
            <div className={classes.bottomSpacer}></div>
            <Typography variant="body1" className={classes.userText}>
              <span style={{ color: roleColors[Math.floor(Math.random() * 3)]}} className={classes.nameSpan}>{user.username}</span>
              <br />
              <span className={classes.subtitle}>Playing Rocket League</span>
            </Typography>
          </Paper>
    </Paper>)}
  </Drawer>;
};

export default ServerUsers;
