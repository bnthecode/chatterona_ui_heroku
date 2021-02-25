import {
  Paper,
  TextField,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  input: {
    "&::placeholder": {
      color: "white",
    },
    "&:focused": {
      borderColor: "orange",
    },
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    fontWeight: 600,
    height: 32,
    fontSize: 12,
    padding: 2,

    cursor: "pointer",
  },
  muiInput: {
    "&:disabled": {
      color: "white",
    },
    width: "100%",
    cursor: "pointer",
  },
  focused: {},
}));
const ConnectionChannelHeader = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        cursor: 'pointer',
        width: "100%",
        height: 46,
        display: "flex",
        borderBottom: '1px solid #202225',
      }}
    >
      <Paper
        elevation={0}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
        }}
        onClick={() => {}}
      >
        <Typography style={{ color: "white", flexGrow: 1, fontWeight: 500 }}>
          <TextField
            placeholder="find or start a conversation"
            color="secondary"
            InputProps={{
              className: classes.input,
            }}
            className={classes.muiInput}
            id="server-name"
            variant="outlined"
            margin="dense"
          ></TextField>
        </Typography>
      </Paper>
    </div>
  );
};

export default ConnectionChannelHeader;
