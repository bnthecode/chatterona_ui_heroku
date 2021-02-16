import { faGem } from "@fortawesome/free-solid-svg-icons";
import { Grow, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import List from "../../_reusable/List";


const useStyles = makeStyles((theme) => ({
  menu: {
    position: "absolute",
    top: 54,
    left: 86,
    padding: 6,
    width: "calc(100% - 110px)",
    backgroundColor: "#1e1e1e",
  },
}));
const listItems = [
  { name: "Server Boost", icon: faGem, break: true },
  { name: "Invite People", icon: faGem, props: { color: "#677BC4" } },
  { name: "Server Settings", icon: faGem },
  { name: "Create Channel", icon: faGem },
  { name: "Create Category", icon: faGem, break: true },
  { name: "Notificaion Settings", icon: faGem },
  { name: "Privacy Settings", icon: faGem, break: true },
  { name: "Change Nickname", icon: faGem },
  { name: "Hide Muted Channels", icon: faGem },
];
const HeaderOptions = ({ headerOptions }) => {
  const classes = useStyles();
  return (
    <Grow timeout={1000} in={headerOptions}>
       <Paper className={classes.menu}>
        <List 
        listItemProps={{}}
        listProps={{
          listItems: listItems
        }}
         style={{ padding: 2, maxHeight: 200 }}>

         </List>
        </Paper>
    </Grow>
  );
};

export default HeaderOptions;
