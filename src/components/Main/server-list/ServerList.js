import { Divider, makeStyles } from "@material-ui/core";
import Drawer from "../../_reusable/Drawer";
import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";
import DownloadIcon from "@material-ui/icons/GetApp";
import { useState } from "react";
import ServerListItem from "./ServerListItem";
import AddServer from "../server/add-server/AddServer";
import { CastConnected } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "100vh",
    zIndex: theme.zIndex.drawer + 1,
    overflowY: "auto",
    display: "flex",
    width: "72px",
    alignItems: "center",
    backgroundColor: "#202225",
  },
  divider: {
    backgroundColor: "hsla(0,0%,100%,0.06)",
    margin: "0 20px 0 20px",
    height: 2,
    width: "calc(100% - 40px)",
  },
  mainIcon: {
    color: "#bdbdbd",
  },
  selected: {
    backgroundColor: "#7289da",
  },
}));
const ServerList = ({
  servers,
  serverId,
  selectedItem,
  createServer,
  handleSelection,
}) => {
  const [showAddServerDialog, setAddServerDialogOpen] = useState(false);
  const isSelected = (id) => selectedItem === id || serverId === id;

  const handleAddServer = async (server) => {
    createServer(server);
    setAddServerDialogOpen(false);
  };

  const classes = useStyles();
  return (
    <Drawer anchor="left" className={classes.drawer}>
      <ServerListItem
        title="Home"
        id="@me"
        customClass={classes.mainIcon}
        customSelectedClass={classes.selected}
        selected={isSelected("@me")}
        setSelected={() => handleSelection("@me")}
      >
        <CastConnected style={{ fontSize: 28 }} />
      </ServerListItem>
      <Divider className={classes.divider} />
      {servers ? (
        servers.map((svr) => (
          <ServerListItem
            title={svr.name}
            id={svr.id}
            setSelected={() => handleSelection("server", svr.id)}
            selected={isSelected(svr.id)}
            listItemProps={{
              onClick: () => handleSelection("server", svr.id),
              style: { backgroundImage: `url(${svr.photoURL})` },
            }}
          />
        ))
      ) : (
        <div />
      )}
      <ServerListItem
        title="Add a server"
        id="add-server"
        setSelected={() => null}
        selected={false}
        listItemProps={{
          onClick: () => setAddServerDialogOpen(true),
        }}
      >
        <AddIcon />
      </ServerListItem>
      <ServerListItem
        title="Explore Public Servers"
        id="public-servers"
        setSelected={() => handleSelection("public-servers")}
        selected={false}
      >
        <ExploreIcon />
      </ServerListItem>
      <Divider className={classes.divider} />
      <ServerListItem
        title="Download Apps"
        id="download-apps"
        setSelected={() => null}
        selected={false}
        listItemProps={{
          onClick: () => {},
        }}
      >
        <DownloadIcon />
      </ServerListItem>
      <AddServer
        showAddServerDialog={showAddServerDialog}
        handleAddServer={handleAddServer}
        setAddServerDialogOpen={setAddServerDialogOpen}
      />
    </Drawer>
  );
};

export default ServerList;
