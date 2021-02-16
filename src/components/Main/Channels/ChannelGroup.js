import { faChevronDown, faChevronRight, faHashtag, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "@material-ui/core";
import ChannelListItem from "./ChannelListItem";

const ChannelGroup = ({
  channels,
  type,
  headerIconRight,
  setChannelDialogOpen,
  toggleDropdown,
  dropdownValues,
  listItemClick,
  channelId,
}) => {
    const icons = {
        voice: faVolumeUp,
        text: faHashtag
    }
 
  return (
    <div>
      <ChannelListItem
        header
        iconLeft={dropdownValues[type] ? faChevronDown : faChevronRight}
        iconRight={{
          icon: headerIconRight,
          title: "Create a channel",
          onClick: () => setChannelDialogOpen({ type, open: true }),
        }}
        title={`${type} channels`.toUpperCase()}
        titleStyle={{ fontSize: 12 }}
        onClick={() => toggleDropdown(type)}
      />
      <Collapse in={dropdownValues[type]} timeout={200}>
        {channels
          ? channels.map((chnl) => (
              <ChannelListItem
                selected={chnl.id === channelId}
                iconLeft={icons[type]}
                title={chnl.name}
                onClick={() => listItemClick(chnl.id)}
              />
            ))
          : ""}
      </Collapse>
    </div>
  );
};

export default ChannelGroup;
