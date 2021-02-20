import { Paper, Tooltip, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  serverListItem: {
    transition: "all .5s",
    height: 48,
    width: 48,
    minHeight: 40,
    color: "#43b581",
    borderRadius: 24,
    // backgroundSize: '44px 44px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    objectFit: "contain",
    backgroundColor: theme.palette.secondary.dark,
    margin: 6,
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: "#43b581",
      borderRadius: "35%",
    },
  },
  selected: {
    transition: "all .25s",
    color: "white",
    backgroundColor: "#43b581",
    borderRadius: "35%",
  },
}));

const ServerListItem = ({
  listItemProps,
  id,
  title,
  selected,
  setSelected,
  customClass,
  customSelectedClass,
  children,
}) => {
  const classes = useStyles();
  const [hovering, setHovering] = useState("");

  const baseStyle = {
    backgroundColor: "#FFFFFF",
    marginLeft: "-5px",
    position: "absolute",
    width: 4,
    transition: ".25s height",
    borderRadius: "0px 3px 3px 0px",
  };
  const getSelectedStyles = (id) => {
    if (hovering === id) {
      return {
        ...baseStyle,
        height: selected ? "calc(100% - 24px)" : 20,
      };
    }
    return selected
      ? {
          ...baseStyle,
          height: "calc(100% - 24px)",
        }
      : {};
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
      onClick={() => setSelected(id)}
    >
      <div style={{ height: 0, ...getSelectedStyles(id) }} />
      <div>
        <Tooltip placement="right" title={title}>
          <Paper
            onMouseEnter={() => setHovering(id)}
            onMouseLeave={() => setHovering(null)}
            className={clsx(
              selected
                ? [
                    classes.serverListItem,
                    classes.selected,
                    customSelectedClass,
                  ]
                : [classes.serverListItem, customClass]
            )}
            {...listItemProps}
          >
            {children}
          </Paper>
        </Tooltip>
      </div>
    </div>
  );
};

export default ServerListItem;
