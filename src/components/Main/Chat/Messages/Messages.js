import { Grid } from "@material-ui/core";
import { memo } from "react";
import MessageItem from "./MessageItem";
import NewDayDivider from "./NewDayDivider";
import InitialChannelMessage from "./InitialChannelMessage";
const Messages = ({ messages, messageRef, channelName }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={`${message}_${index}`}>
          <Grid item xs={12}>
            <NewDayDivider
              messages={messages}
              index={index}
              message={message}
            />
          </Grid>
          <MessageItem message={message} />
        </div>
      ))}
      <div ref={messageRef} />
    </div>
  )
};

export default memo(Messages);
