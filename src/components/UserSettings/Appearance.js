import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: 700,
    color: "white",
  },
}));
const Appearance = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.header} variant="h6">
      APPEARANCE
    </Typography>
  );
};

export default Appearance;
