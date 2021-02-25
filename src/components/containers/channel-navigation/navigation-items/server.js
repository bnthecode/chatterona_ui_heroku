import ServerChannels from "../../../main/server/server-channels/ServerChannels";

const ServerChannelNavigation = ({
  channels,
  channelId,
  friends,
  selectChannel,
  createChannel,
  inviteUsers,
  serverName,
}) => {
  return (
    <ServerChannels
      channels={channels}
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
