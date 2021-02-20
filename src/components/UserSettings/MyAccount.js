import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: 700,
    color: "white",
  },
}));
const MyAccount = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.header} variant="h6">
      MY ACCOUNT
    </Typography>
  );
};

export default MyAccount;
