import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { truncateString } from "../../utilities/global-utilities";

const useStyles = makeStyles(() => ({
  listItem: {
    color: "grey",
    width: "calc(100% - 16px)",
    marginBottom: 4,
    "&:hover": {
      backgroundColor: "#2f3438",
      color: "#fff",
    },
    "&:focus": {
      backgroundColor: "#23272a",
    },
    marginLeft: 8,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    color: "grey",
    width: "100%",
    "&:hover": {
      color: "#fff",
    },
    
    borderRadius: 6,
    marginBottom: 4,
    fontSize: 12,
  },
  selected: {
    color: "white",
    backgroundColor: "#2f3438",
    "&:hover": {
      backgroundColor: "#2f3438",
      color: "#fff",
    },
  },
  iconLeftClass: {
    marginRight: 8,
    fontSize: 12,
  },
  iconRightClass: {
    marginLeft: "auto",
    fontSize: 12,
  },
  headerText: {
    alignItems: "center",
    display: "flex",
    fontSize: 12,
  },
  listText: {
    alignItems: "center",
    display: "flex",
    fontSize: 14,
  },
}));

const CollapsableListItem = ({
  header,
  title,
  iconLeft,
  iconRight,
  item,
  onClick,
  customListItem = false,
  iconLeftProps,
  selected,
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div>
      <ListItem
        classes={{
          selected: classes.selected,
        }}
        className={header ? classes.header : classes.listItem}
        disableRipple={true}
        onClick={onClick}
        selected={selected}
        dense
        button
        {...props}
      >
        <ListItemText
          primary={
            customListItem ? (
              customListItem
            ) : (
              <Typography
                className={header ? classes.headerText : classes.listText}
                style={{ fontWeight: 600 }}
              >
                {iconLeft}
                <span>{title}</span>
              </Typography>
            )
          }
        />
        {iconRight && (
          <Tooltip placement="right" title={iconRight.title}>
            <ListItemIcon>
              <FontAwesomeIcon
                onClick={(e) => {
                  e.preventDefault();
                  iconRight.onClick(item);
                }}
                className={clsx([classes.iconRightClass])}
                color="#636363"
                icon={iconRight.icon}
              ></FontAwesomeIcon>
            </ListItemIcon>
          </Tooltip>
        )}
      </ListItem>
      <Collapse in={true} timeout={200}>
        {children}
      </Collapse>
    </div>
  );
};

export default CollapsableListItem;
