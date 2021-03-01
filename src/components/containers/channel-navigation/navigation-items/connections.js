import ConnectionChannels from "../../../main/connections/connection-channels/ConnectionChannels";

const ConnectionsChannelNavigation = ({
  directMessages,
  createDirectMessage,
  channelId,
  friends,
  userId,
  selectDirectMessage,
  createChannel,
  handleDirectMessage,
  selectListItem,
  match
}) => {
  return (
    <div>
      <ConnectionChannels
      createDirectMessage={createDirectMessage}
        directMessages={directMessages}
        channelId={channelId}
        friends={friends}
        userId={userId}
        selectDirectMessage={selectDirectMessage}
        createChannel={createChannel}
        handleDirectMessage={handleDirectMessage}
        selectListItem={selectListItem}
      />
    </div>
  );
};
export default ConnectionsChannelNavigation;
