const MessageItemImage = ({ content }) => {

const { url } = content;
  return (
    <a
      tabIndex="0"
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      role="button"
      style={{ maxWidth: "600px", maxHeight: "600px" }}
    >
      <img
        alt=""
        src={url}
        style={{ maxWidth: "600px", maxHeight: "600px" }}
      />
    </a>
  );
};

export default MessageItemImage;
