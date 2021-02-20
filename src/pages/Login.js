import { faAt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  makeStyles,
  Typography,
  TextField,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setAuthUserRedux } from "../redux/actions/authActions";
import config from "../config";
import usersHttp from "../http/users.http";

const useStyles = makeStyles((theme) => ({
  icon: {
    transform: "rotate(-8deg)",
    color: theme.palette.secondary.main,
    margin: "1vh",
  },
  title: {
    "-webkit-text-stroke": `.5px ${theme.palette.secondary.main}`,
    color: theme.palette.primary.light,
    fontWeight: 700,
    fontSize: 50,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    border: `.25px solid ${theme.palette.secondary.main}`,
    height: "300px",
    display: "flex",
    width: "400px",
    position: "relative",
    flexDirection: "column",
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    backgroundColor: theme.palette.secondary.dark,
    bottom: 0,
    width: "100%",
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginTop: 72,
  },
  header: {
    position: "absolute",

    backgroundColor: theme.palette.secondary.dark,
    top: 0,
    width: "100%",
    height: 40,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    fontWeight: 600,
    height: 42,
    fontSize: 12,
    margin: 10,
    padding: 2,
  },
  muiInput: {
    width: "80%",
  },
  btn2: {
    marginLeft: "auto",
    margin: 14,
    height: 32,
  },
  tabItem: {
    fontWeight: 700,
    fontSize: 20,
  },
  headerText: {
    margin: 10,
    color: "lightgrey",
    fontSize: "1.25rem",
  },
  focused: {},
}));
const Login = ({ setAuthUser, history }) => {
  const classes = useStyles();
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState("Login");

  
  const handleInitSignIn = async () => {
    setLoggingIn(true);
    const user = await usersHttp.loginUser(config.devUser);
    setAuthUser(user);
    setTimeout(async () => {
      history.push("/@me");
    }, 1000);
  };

  return (
    <div
      style={{
        opacity: loggingIn ? 0 : 1,
        transition: "2s all",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "",
      }}
    >
      <Typography className={classes.title}>
        Chatterona
        <FontAwesomeIcon
          icon={faCommentDots}
          className={classes.icon}
        ></FontAwesomeIcon>
      </Typography>
      <Paper elevation={24} className={classes.paper}>
        <Paper square className={classes.header}>
          { ['Login', 'Sign up'].map((item) => (
            <Paper
            style={{
              backgroundColor: tab === item ? "#7289da" : "transparent",
              cursor: 'pointer',
              transition: 'all .5s',
              display: "flex",
              justifyContent: "center",
              alignItems: 'center',
              opacity: ".8",
              height: "100%",
              width: "50%",
            }}
            onClick={() => setTab(item)}
            square
          >
            <Typography style={{ opacity: tab === item ? ".8" : ".25",}} className={classes.tabItem}>{item}</Typography>
          </Paper>
          ))}
          
        </Paper>
        <div className={classes.content}>
          <div className={classes.flexRow}>
            <TextField
              autoFocus={true}
              placeholder="username"
              color="secondary"
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon
                    style={{
                      color: "grey",
                      marginLeft: 8,
                      fontSize: 16,
                      marginRight: 4,
                    }}
                    icon={faAt}
                  />
                ),
                className: classes.input,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              }}
              className={classes.muiInput}
              id="username"
              variant="outlined"
            ></TextField>
          </div>
          <div className={classes.flexRow}>
            <TextField
              placeholder="password"
              color="secondary"
              InputProps={{
                className: classes.input,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              }}
              className={classes.muiInput}
              id="username"
              variant="outlined"
            ></TextField>
          </div>
          <Paper square className={classes.footer}>
            <Button onClick={handleInitSignIn} className={classes.btn2} color="secondary">
              Get started
            </Button>
          </Paper>
        </div>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAuthUser: dispatch(setAuthUserRedux),
});

export default connect(null, mapDispatchToProps)(Login);

// import { faAt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Button,
//   makeStyles,
//   Typography,
//   TextField,
//   Fade,
// } from "@material-ui/core";
// import { connect } from "react-redux";
// import { setAuthUserRedux } from "../redux/actions/authActions";
// import config from "../config";
// import usersHttp from "../http/users.http";

// const useStyles = makeStyles((theme) => ({
//   input: {
//     "&::placeholder": {
//       color: "white",
//     },

//     backgroundColor: theme.palette.primary.dark,
//     color: "white",
//     fontWeight: 600,
//     height: 36,
//     fontSize: 12,
//     padding: 2,
//   },
//   muiInput: {
//     marginTop: 80,
//     width: 200,
//   },
//   focused: {},
// }));
// const Login = ({ setAuthUser, history }) => {
//   const classes = useStyles();
//   const [loggingIn, setLoggingIn] = useState(false);
//   const [username, setUsername] = useState("");

//   const handleInitSignIn = async () => {
//     setLoggingIn(true);
//     const user = await usersHttp.loginUser(config.devUser);
//     setAuthUser(user);
//     setTimeout(async () => {
//       history.push("/");
//     }, 1000);
//   };

//   return (
//     <div
//       style={{
//         opacity: loggingIn ? 0 : 1,
//         transition: "2s all",
//         display: "flex",
//         paddingTop: "30vh",
//         alignItems: "center",
//         justifyContent: "middle",
//         flexDirection: "column",
//       }}
//     >
//       <Typography
//         style={{
//           color: "white",
//           transition: "2s all",
//           opacity: loggingIn ? 0 : 1,
//           transform: `rotate(-${loggingIn ? 0 : 10}deg)`,
//           fontSize: loggingIn ? 100 : 50,
//         }}
//       >
//         Chatterona
//         <FontAwesomeIcon
//           icon={faCommentDots}
//           style={{
//             transform: "rotate(-8deg)",
//             color: "#3d1059",
//             margin: "1vh",
//           }}
//         ></FontAwesomeIcon>
//       </Typography>

//       <TextField
//         autoFocus
//         placeholder="username"
//         color="secondary"
//         onChange={({ target: { value } }) => setUsername(value)}
//         InputProps={{
//           startAdornment: (
//             <FontAwesomeIcon
//               style={{ color: "grey", marginLeft: 8, marginRight: 4 }}
//               icon={faAt}
//             />
//           ),
//           className: classes.input,
//           focused: classes.focused,
//           notchedOutline: classes.notchedOutline,
//         }}
//         className={classes.muiInput}
//         autoFocus
//         id="server-name"
//         variant="outlined"
//         margin="dense"
//       ></TextField>
//       <Fade in={!username.length} timeout={1000}>
//         <div>
//           <Typography
//             style={{
//               color: "white",
//               position: "absolute",
//               left: "49vw",
//               top: 454,
//               fontWeight: 800,
//               transform: "rotate(-8deg)",
//               opacity: loggingIn ? 0 : 1,
//               transform: `rotate(-${loggingIn ? 0 : 10}deg)`,

//             }}
//           >
//             OR
//           </Typography>
//           <Button
//             style={{
//               width: 200,
//               marginTop: 30,
//               backgroundColor: "#3d1059",
//               color: "white",
//               height: 36,
//               fontWeight: 600,
//               textTransform: "none",
//             }}
//             onClick={handleInitSignIn}
//           >
//             Continue as a bot
//           </Button>
//         </div>
//       </Fade>

//       <Fade in={username.length} timeout={1500}>
//         <div style={{ width: "100%", textAlign: "center" }}>
//                 <div style={{ display: 'flex', color: 'white', fontWeight: 700, justifyContent: 'center'}}>

//           { ["P", "r", "e", "s", "s", "  ", "e", "n", "t", "e", "r"].map(
//               (letter, i) => (
//                 <Fade in timeout={i === 0 ? 500 : i * 1500}>
//                   <div style={{ margin: 2, color: 'white'}}>{letter}</div>
//                 </Fade>
//               )
//             )}
//             </div>
//         </div>
//       </Fade>
//       <span
//         style={{
//           position: "absolute",
//           color: "white",
//           bottom: 4,
//           right: 0,
//           fontSize: 12,
//         }}
//       >
//         2/8/21 6:14PM
//       </span>
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => ({
//   setAuthUser: dispatch(setAuthUserRedux),
// });

// export default connect(null, mapDispatchToProps)(Login);
