import { withStyles } from "@material-ui/styles";
import { PureComponent } from "react";
import { Grow, Paper, Slide, TextField, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import PublicServerItem from "./PublicServerItem";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.dark,
    },
    "::-webkit-scrollbar": {
      width: "4px",
    },
  },
  pageContainer: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "row",
  },
  drawer: {
    zIndex: 2000,
    backgroundColor: "#2f3136",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "30%",
    overflow: "auto",
  },
  listClass: {
    marginTop: 64,
    width: 200,
  },
  listItemText: {
    fontSize: "1rem",
  },
  backButton: {
    position: "fixed",
    maxHeight: 40,
    minHeight: 40,
    maxWidth: 40,
    minWidth: 40,
    borderRadius: 20,
    border: "1px solid lightgrey",
    color: "lightgrey",
    fontSize: 16,
    top: 70,
    right: 140,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

class PublicServers extends PureComponent {
  state = {};

  render() {
    const { classes } = this.props;
const{ publicServerList, selectPublicServer } = this.props;
    return (
      <div style={{    margin: 12}}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            minWidth: 800,
  
          }}
        >
          <div
            style={{ position: "absolute", top: "25%", textAlign: "center" }}
          >
            <Typography
              style={{ fontWeight: 700, fontSize: 24, color: "white" }}
            >
              Find your community on Chatterona
            </Typography>
            <Typography
              style={{ fontWeight: 600, fontSize: 16, color: "white" }}
            >
              From gaming, to music, to learning, there's a place for you.
            </Typography>
            <TextField
              placeholder="Explore communities"
              variant="outlined"
              InputProps={{
                style: { height: 42 },
                endAdornment: (
                  <FontAwesomeIcon
                    style={{ cursor: "pointer", color: "grey" }}
                    icon={faSearch}
                  />
                ),
              }}
              style={{
                backgroundColor: "white",
                marginTop: 16,
                width: "100%",
                borderRadius: 8,
              }}
            ></TextField>
          </div>
          <img
            style={{ width: "100%", maxHeight: 500}}
            src="https://discord.com/assets/3e0acf6d69894a5d20deb7c513cd1412.svg"
          />
        </div>
        <Typography style={{ fontSize: 20, marginTop: 16, fontWeight: 600, color: 'white'}}>Featured Communities</Typography>
        <div
          style={{
            display: 'grid',
            marginTop: 16,
            gridGap: '16px',
            gridTemplateColumns: `repeat(auto-fill,minmax(248px,1fr))`
            
          }}
        >
          {publicServerList.map((server) => (
            <PublicServerItem selectPublicServer={selectPublicServer} server={server} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PublicServers);
