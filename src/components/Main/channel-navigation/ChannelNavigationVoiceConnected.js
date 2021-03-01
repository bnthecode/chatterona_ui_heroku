import { faDesktop, faPhoneSlash, faSignal, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";

const ChannelNavigationVoiceConnected = ({
  channelName = "voice channnel",
  serverName = "server name",
}) => {
  return (
    <div
      style={{
        height: 90,
        backgroundColor: "#292b2f",
        width: "100%",
        position: "relative",
        display: "flex",
        borderBottom: "1px solid rgb(128,128,128, .4)",
        padding: 8,
      }}
    >
      <Typography style={{ color: "#43b581", fontWeight: 600 }}>
        <FontAwesomeIcon
          style={{ marginRight: 8 }}
          icon={faSignal}
        ></FontAwesomeIcon>
        Voice Connected
        <Typography style={{ fontSize: 12, color: "lightgrey" }}>
          {channelName} / {serverName}
        </Typography>
      </Typography>
      <Button
        style={{
          alignSelf: "flex-start",
          color: "grey",
          height: 36,
          width: 36,
          minWidth: 36,
          marginLeft: 32,
        }}
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </Button>
      <div
        style={{
          width: "calc(100% - 18px)",
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          display: 'flex',
          left: 0,
          height: 44,
          justifyContent: 'space-between'
        }}
      >
          <Button style={{color: 'white',height: 32, textTransform: 'none', width: '50%', margin: 4, backgroundColor: '#2f3136'}}>
              <FontAwesomeIcon style={{ marginRight: 8}} icon={faVideo} />
              Video
          </Button>
          
          <Button style={{ color: 'white', height: 32, textTransform: 'none',width: '50%',margin: 4, backgroundColor: '#2f3136'}}>
          <FontAwesomeIcon style={{ marginRight: 8}} icon={faDesktop} />
              Screen
          </Button>
      </div>
    </div>
  );
};

export default ChannelNavigationVoiceConnected;
