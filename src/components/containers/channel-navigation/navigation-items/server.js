import ServerChannels from "../../../main/server/server-channels/ServerChannels";

const ServerChannelNavigation = ({
  categories,
  channelId,
  friends,
  selectChannel,
  createChannel,
  inviteUsers,
  serverName,
}) => {
  return (
    <ServerChannels
      categories={categories}
      channelId={channelId}
      friends={friends}
      selectChannel={selectChannel}
      createChannel={createChannel}
      inviteUsers={inviteUsers}
      serverName={serverName}
    />
  );
};
export default ServerChannelNavigation;
