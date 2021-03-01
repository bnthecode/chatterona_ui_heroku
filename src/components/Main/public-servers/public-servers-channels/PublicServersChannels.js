import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { List, Paper, Typography } from "@material-ui/core";
import { Flare, MusicNoteOutlined, PeopleAlt, School, Speed, SportsEsports, Tv } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Avatar from "../../../_reusable/Avatar";
import CollapsableListItem from "../../../_reusable/CollapsableListItem";
import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";
import GamepadIcon from "@material-ui/icons/Gamepad";
import DownloadIcon from "@material-ui/icons/GetApp";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  avatar: { marginLeft: -12 },
  icon: {
    "&:hover": {
      color: "red",
    },
    position: "absolute",
    right: 8,
  },
  listItem: {
   
      '&:focus': {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
          },
        backgroundColor: theme.palette.secondary.main
      }
  },
  selected: { "&$selected": { backgroundColor: theme.palette.secondary.main }}
}));

const PublicServersChannels = ({
  selectCategory
}) => {
  const classes = useStyles();

  const [selected, setSelected] = useState("Home");

  const handleItemClick = (item) => {
      selectCategory(item.name)
      setSelected(item.name)

  }
  const listItems = [
      {name: 'Home', Icon: ExploreIcon },
      {name: 'Gaming', Icon: SportsEsports },
      {name: 'Music', Icon: MusicNoteOutlined },
      {name: 'Education', Icon: School },
      {name: 'Science & Tech', Icon: Flare },
      {name: 'Entertainment', Icon: Tv },

  ]
  return (
    <>
    <Typography style={{ marginLeft: 12, fontWeight: 700, color: 'white', fontSize: 24, marginTop: 10}}>Discover</Typography>
      <List className={classes.list}>
       { listItems.map((item) => (
           <CollapsableListItem
           style={{ height: 42 }}
           customClass={classes.listItem}
          onClick={() => handleItemClick(item)}
           selected={selected === item.name}
           classes={{
             selected: classes.selected
           }}
           iconLeft={<item.Icon style={{ fontSize: 24, marginRight: 16, color: 'lightgrey' }} />}
           title={<span style={{ fontSize: 16, color: 'lightgrey' }}>{item.name}</span>}

         />
       ))}


      </List>
    </>
  );
};

export default PublicServersChannels;
