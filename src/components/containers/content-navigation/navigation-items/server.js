import Chat from "../../../main/chat/Chat";

const ServerContent = ({
  username,
  messages,
  userDrawer,
  channelId,
  channel,
  messageRef,
  sendWebsocketChannelTyper,
  sendWebsocketMessage,
  websocketTypers,
}) => (
  <div>
      <Chat
        username={username}
        messages={messages}
        userDrawer={userDrawer}
        channelId={channelId}
        channel={channel}
        messageRef={messageRef}
        sendWebsocketChannelTyper={sendWebsocketChannelTyper}
        sendWebsocketMessage={sendWebsocketMessage}
        websocketTypers={websocketTypers}
      />
    {/* <ServerUsers
      userDrawer={userDrawer}
      serverName={serverName}
      serverId={serverId}
      route={route}
    /> */}
  </div>
);

export default ServerContent;
