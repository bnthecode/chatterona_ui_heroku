import {
  InputLabel,
  Button,
  DialogTitle,
  Typography,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 8,
    color: "grey",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 80,
    backgroundColor: "lightgrey",
    width: "100%",
  },

  footerText: {
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: 20,
  },
  footerButton: {
    marginLeft: "auto",
    height: 40,
    width: 100,
    marginRight: 20,
    fontWeight: 700,
    textTransform: "none",
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "#4f4f4f",
    },
  },
  uploadWrapper: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 140,
    borderRadius: 45,
    height: 90,
    width: 90,
    border: "2px dashed grey",
  },
  uploadIcon: {
    color: "grey",
    alignSelf: "center",
    fontSize: 30,
  },
  uploadText: {
    fontWeight: 700,
    color: "grey",
    fontSize: 12,
  },
  "@global": {
    "*::-webkit-file-upload-button": {
      color: "red",
      padding: "1em",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
  },

  label: {
    fontSize: 12,
    fontWeight: 700,
    alignSelf: "flex-start",
  },
  input: {
    fontWeight: 600,
    height: 36,
    fontSize: 12,
  },
  uploadLabel: {
    cursor: "pointer",
  },
  btn: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    "&:focus": {
      outline: "none",
      border: "none",
      backgroundColor: "transparent",
    },
  },
  icon: {
    color: "grey",
    fontSize: 40,
  },
}));
const PageThree = ({ setStep, step, onComplete, navState, username }) => {
  const classes = useStyles();
  const [serverName, setServerName] = useState("");
  const [serverImg, setServerImg] = useState("");

  const fileHandler = (e) => {
    setServerImg(e.target.files[0]);
  };

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const handleFinish = () => {
    onComplete({ ...navState, name: serverName, file: serverImg, })
  }

  return (
    <>
      <DialogTitle>
        <Typography className={classes.title}>Customize your server</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          Give your new server a personality with a name and an icon. You can
          alway change it later.
        </Typography>
      </DialogTitle>

      <Paper className={classes.uploadWrapper}>
        <Paper elevation={0} className={classes.uploadText}>
          <div style={{ display: "grid" }}>
            <button className={classes.btn} id="plus" onClick={upload}>
              <FontAwesomeIcon
                className={classes.icon}
                icon={faCamera}
              ></FontAwesomeIcon>
            </button>
            <input id="selectImage" hidden type="file" onChange={fileHandler} />
          </div>
        </Paper>
      </Paper>
      <InputLabel className={classes.label} htmlFor="server-name">
        SERVER NAME
      </InputLabel>
      <TextField
        autoFocus
        placeholder={`${username}'s server`}
        onChange={({ target: { value } }) => setServerName(value)}
        InputProps={{
          className: classes.input,
        }}
        id="server-name"
        variant="outlined"
        margin="dense"
      ></TextField>
      <Paper className={classes.footer}>
        <Typography
          onClick={() => setStep(step - 1)}
          className={classes.footerText}
          variant="body2"
        >
          Back
        </Typography>
        <Button
          onClick={() => handleFinish()}
          className={classes.footerButton}
        >
          Create
        </Button>
      </Paper>
    </>
  );
};

export default PageThree;
