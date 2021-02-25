import ConnectionChannels from "../../../main/connections/connection-channels/ConnectionChannels";

const ConnectionsChannelNavigation = ({
  channels,
  channelId,
  friends,
  userId,
  selectChannel,
  createChannel,
  handleDirectMessage,
}) => {
  return (
    <ConnectionChannels
      channels={channels}
      channelId={channelId}
      friends={friends}
      userId={userId}
      selectChannel={selectChannel}
      createChannel={createChannel}
      handleDirectMessage={handleDirectMessage}
    />
  );
};
export default ConnectionsChannelNavigation;