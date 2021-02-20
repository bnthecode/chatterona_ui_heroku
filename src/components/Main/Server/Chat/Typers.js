import { makeStyles, Typography } from "@material-ui/core";
import { memo } from "react";
import { truncateString } from "../../../../utilities/global-utilities";

const useStyles = makeStyles(() => ({
  userTypings: {
    width: 400,
    color: "white",
  },
}));

const buildTyperString = (typers) => {
  const end = typers.length > 1 ? "are typing..." : "is typing...";
  const string = typers.reduce((acc, typer, i) => {
    const name = truncateString(typer, 10);
    acc = i === 0 ? name : `${name}, ` + acc;
    return acc;
  }, "");
  return typers.length > 3 ? "Everyone and their mom are typing" : `${string} ${end}`;
};

const Typers = ({ websocketTypers = [] }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        width: 800,
        position: "absolute",
        bottom: 60,
        left: 16,
        flexDirection: "row",
        marginBottom: 0,
      }}
    >
      <Typography style={{ color: "white", fontSize: 12 }} id="user-typing">
        {websocketTypers.length ? buildTyperString(websocketTypers) : <div />}
      </Typography>

      <div />
    </div>
  );
};

export default memo(Typers);
