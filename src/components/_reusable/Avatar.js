import { faCircle, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.secondary.main,
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




  },

}));

const getSizes = (type) => {
  switch (type) {
    case "xxs":
      return { height: 24, width: 24 };
    case "xs":
      return { height: 32, width: 32 };
    case "sm":
      return { height: 36, width: 36 };
    case "md":
      return { height: 42, width: 42 };
    case "lg":
      return { height: 54, width: 54 };
    default:
      return { height: 54, width: 54 };
  }
};

const icons = {
  online: { icon: faCircle, style: { color: '#20b673'}},
  idle: { icon: faMoon, style: { color: '#e1ad01', transform: 'rotate(240deg)'}},
  offline: { icon: faCircle, style: { color: 'grey'}},
}

const getStatusIcon = (status) => {
  const baseStyle = { 
    height: 10,
    width: 10,
    border: "4px solid #2f3136",
    borderRadius: 12,
    position: "absolute",
    bottom: 2,
    backgroundColor: '#2f3136',
    left: 22,
  }
  return <FontAwesomeIcon icon={icons[status].icon} style={{...baseStyle, ...icons[status].style}} />
}

const Avatar = ({ photoURL, backgroundURL, size, status = 'online', hideStatus, ...props }) => {
  const classes = useStyles();
  const { height, width } = getSizes(size);
  return (
    <div style={{ position: 'relative'}}>
    <Paper
      style={{
        backgroundImage: `url(${backgroundURL || photoURL})`,
        height,
        width,
        borderRadius: height / 2,
      }}
      className={clsx(classes.avatar)}
      {...props}
      
    />
         {!hideStatus &&
         <div className={classes.activeIcon}>
          {getStatusIcon(status.toLowerCase())} 
           </div> 
           }
    </div>
  );
};
const mapStateToProps = (state) => ({
  photoURL: state.auth.user.photoURL,
})
export default connect(mapStateToProps, null)( Avatar);
