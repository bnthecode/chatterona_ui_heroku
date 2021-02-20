import {
  faBell,
  faCog,
  faFolderPlus,
  faGem,
  faPencilAlt,
  faPlusCircle,
  faShieldAlt,

  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox, FormControlLabel, Grow, Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import List from "../../../../_reusable/List";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  menu: {
    position: "absolute",
    zIndex: 2600,
    top: 54,
    left: 8,
    padding: 6,
    width: "calc(100% - 26px)",
    backgroundColor: "#1e1e1e",
  },
  icon: {
    color: "white",
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
    position: "absolute",
    right: 2,
  },
  checked: {},
})((props) => <Checkbox {...props} />);

const HeaderOptions = ({ headerOptions, handleChannelOptionSelect, hideMutedChannels }) => {
  const classes = useStyles();
 


  const listItems = [
    { name: "Server Boost", icon: faGem, break: true },
    { name: "Invite People", icon: faUserPlus, style: { color: "#677BC4" } },
    { name: "Server Settings", icon: faCog },
    { name: "Create Channel", icon: faPlusCircle },
    { name: "Create Category", icon: faFolderPlus, break: true },
    { name: "Notification Settings", icon: faBell },
    { name: "Privacy Settings", icon: faShieldAlt, break: true },
    { name: "Change Nickname", icon: faPencilAlt },
    {
      name: "Hide Muted Channels",
      customIcon: (
        <FormControlLabel
          control={
            <GreenCheckbox checked={hideMutedChannels} />
          }
        />
      ),
    },
  ];
  return (
    <Grow timeout={250} in={headerOptions}>
      <Paper className={classes.menu}>
        <List
          listItemProps={{
            handleSelect: handleChannelOptionSelect,
          }}
          listProps={{
            listItems: listItems,
          }}
          style={{ padding: 2, maxHeight: 200 }}
        ></List>
      </Paper>
    </Grow>
  );
};

export default HeaderOptions;
