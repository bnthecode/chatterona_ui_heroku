import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListItem as MuiListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import ListItemHeader from "./ListItemHeader";

const useStyles = makeStyles(() => ({
  headerItem: {
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#5c6fb1",

      color: "white",
    },
    borderRadius: 4,
  },
  listText: {
    "&:hover": {
      color: "white",
    },
  },
  menuItem: {
    color: "#B9BBBE",
    fontSize: 12,
    fontWeight: 600,
  },
}));

const ListItem = ({ listItem, listItemProps, ...props }) => {
  const { listItemClass, textClass, handleSelect, headerProps = {} } = listItemProps;
  console.log(listItemProps)

  const classes = useStyles();
  return (
    <div>
     { listItem.header && <ListItemHeader  name={listItem.header} headerProps={headerProps} /> }
    <MuiListItem
      onClick={() => handleSelect(listItem.name)}
      className={clsx([classes.headerItem, listItemClass])}
      dense
      button
    >
     
      <ListItemText
        className={classes.listText}
        primary={
          <Typography
            style={{ ...listItem.props }}
            className={clsx([classes.menuItem, textClass])}
          >
            {listItem.name}
          </Typography>
        }
      />
      {listItem.icon ? (
        <FontAwesomeIcon
          style={{ ...listItem.props, fontSize: 12 }}
          icon={listItem.icon}
        ></FontAwesomeIcon>
      ) : (
        ""
      )}
    </MuiListItem>
    </div>
  );
};

export default ListItem;
