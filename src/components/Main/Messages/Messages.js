import { Grid } from "@material-ui/core";
import { memo } from "react";
import MessageItem from "./MessageItem";
import NewDayDivider from "./NewDayDivider";
import NoMessagesDisplay from "./NoMessagesDisplay";
const Messages = ({ messages, messageRef }) => {
  return messages && messages.length ? (
    <div>
     { messages.map((message, index) => (
      <div>
        <Grid item xs={12}>
        <NewDayDivider messages={messages} index={index} message={message} />
        </Grid>
        <MessageItem message={message} />
        </div> 
          ))
    }
    <div ref={messageRef} />
    </div> 
  ) : (
    <NoMessagesDisplay />
  );
};

export default memo(Messages);
