import MessageItem from "./MessageItem";

const MessageLoader = ({ loading, userPhoto, username }) => {
  return loading ? (
    <MessageItem
      message={{
        content: [{ type: 'link'}],
        author: { username, photoURL: userPhoto },
      }}
    />
  ) : (
    ""
  );
};

export default MessageLoader;
