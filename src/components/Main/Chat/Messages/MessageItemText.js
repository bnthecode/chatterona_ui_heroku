import { Typography } from "@material-ui/core";

const MessageItemText = ({ content }) => {
  return (
    <Typography
      style={{ fontWeight: 600, fontSize: 14, lineHeight: "1.10rem" }}
    >
      {" "}
      {content.message}
    </Typography>
  );
};

export default MessageItemText;
