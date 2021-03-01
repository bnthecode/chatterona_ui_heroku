import { Route, Switch, withRouter } from "react-router";
import Chat from "../../../main/chat/Chat";
import ConnectionFriends from "../../../main/connections/connection-friends/ConnectionFriends";
//     really need better routing
const ConnectionsContent = ({
  username,
  messages,
  userDrawer,
  channelId,
  channel,
  messageRef,
  sendWebsocketChannelTyper,
  sendWebsocketMessage,
  websocketTypers,
  match,
  friends,
  headerFilter
}) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/store`}>
          <div>store</div>
        </Route>
        <Route path={`${match.url}/:id`}>
          <div style={{ padding: 8 }}>
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
          </div>

          {/* youd have a friends herer */}
        </Route>
        <Route exact path={`${match.url}`}>
          <ConnectionFriends headerFilter={headerFilter} friends={friends} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(ConnectionsContent);
