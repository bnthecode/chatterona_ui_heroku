import { makeStyles, Typography } from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles(() => ({
  userTypings: {
    width: 400,
    position: "absolute",
    bottom: 60,
    borderRadius: 8,
    color: "white",
  },
}));
const Typers = ({ typers }) => {
  const classes = useStyles();
  return typers && typers.length ? (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography className={classes.userTypings}>Typers</Typography>
    </div>
  ) : (
    <div />
  );
};

export default memo(Typers);
