import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Typography } from "@material-ui/core"

const ServerContentHeader = ({ channel }) => {
  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <FontAwesomeIcon style={{ color: 'grey', marginRight: 8}} icon={faHashtag}/> 
    <Typography style={{ color: 'white', fontWeight: 600, fontSize: 16, marginBottom: 2}}>{channel.name}</Typography>
    </div>;
};
export default ServerContentHeader;
