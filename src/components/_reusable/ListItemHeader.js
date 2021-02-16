import {
  ListItem as MuiListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
const useStyles = makeStyles(() => ({
    headerItem: {
    width: "100%",
    cursor: 'default',
    "&:hover": {
      backgroundColor: "transparent",
    },
    borderRadius: 4,
    },
    headerText: {
        "&:hover": {
          color: "white",
        },
      },
      menuItem: {
        color: "#B9BBBE",
        fontSize: 12,
        fontWeight: 800,
      },
  }));

const ListItemHeader = ({ headerProps, name }) => {
    const classes = useStyles();
    const { headerClass, headerTextClass } = headerProps;
  return (
    <MuiListItem
      className={clsx([classes.headerItem, headerClass])}
      dense
    >
      <ListItemText
        className={classes.headerText}
        primary={
          <Typography
            className={clsx([classes.menuItem, headerTextClass])}
          >
            {name.toUpperCase()}
          </Typography>
        }
      />
    </MuiListItem>
  );
};

export default ListItemHeader;