import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog as MuiDialog} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    backgroundColor: '#36393f',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
}));

const Dialog = ({
    height = 410, 
    width = 440,
    open = true,
    handleClose,
    children
}) => {
    const classes = useStyles();

  return (
    <MuiDialog
    BackdropProps={{
      className: classes.backdrop
    }}
    onBackdropClick={handleClose}
    disableBackdropClick={false}
      PaperProps={{
      
        className: classes.paper,
        style: { height: height, width: width}
      }}
      open={open}
    >
      {children}
    </MuiDialog>
  );
};

export default Dialog;
