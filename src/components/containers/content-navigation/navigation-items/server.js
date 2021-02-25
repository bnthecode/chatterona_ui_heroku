import Chat from "../../../main/chat/Chat";
import ServerUsers from "../../../main/server/ServerUsers";

const ServerContent = ({
  username,
  messages,
  userDrawer,
  channelId,
  messageRef,
  sendWebsocketChannelTyper,
  sendWebsocketMessage,
  websocketTypers,
  serverName,
  serverId,
  route,
}) => (
  <div>
    <div style={{ padding: 8 }}>
      <Chat
        username={username}
        messages={messages}
        userDrawer={userDrawer}
        channelId={channelId}
        messageRef={messageRef}
        sendWebsocketChannelTyper={sendWebsocketChannelTyper}
        sendWebsocketMessage={sendWebsocketMessage}
        websocketTypers={websocketTypers}
      />
    </div>
    <ServerUsers
      userDrawer={userDrawer}
      serverName={serverName}
      serverId={serverId}
      route={route}
    />
  </div>
);

export default ServerContent;
