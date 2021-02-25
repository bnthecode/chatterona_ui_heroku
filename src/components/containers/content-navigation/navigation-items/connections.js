import { Route } from "react-router";
import Chat from "../../../main/chat/Chat";
//     really need better routing
const ConnectionsContent = ({
  username,
  messages,
  userDrawer,
  channelId,
  messageRef,
  sendWebsocketChannelTyper,
  sendWebsocketMessage,
  websocketTypers,
}) => (
  <div>

    <Route path="/channels/@me/:id">
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
    </Route>
  </div>
);

export default ConnectionsContent;
