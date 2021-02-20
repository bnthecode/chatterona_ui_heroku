import { Paper, Typography } from "@material-ui/core";
import moment from "moment";

const NewDayDivider = ({ messages, message, index }) => {
  const isNewDay = (currentDate, previousDate) => {
    return !moment(currentDate).isSame(previousDate, "day");
  };

  const renderNewDate = isNewDay(
    message.date,
    messages[index - 1] ? messages[index - 1].date : message.date
  );

  return renderNewDate ? (
    <Paper
      elevation={0}
      square
      style={{
        height: 20,
        position: "relative",
        textAlign: "center",
        backgroundColor: "transparent",
        width: "calc(100% - 75px)",
        borderBottom: "1px solid grey",
        padding: 8,
      }}
    >
      <Typography
        style={{
          color: "grey",
          fontSize: 12,
          bottom: -8,
          backgroundColor: "#36393f",
          right: "calc(50% - 36px)",
          position: "absolute",
          fontWeight: 600,
          padding: "0 8px 0 8px",
        }}
      >
        {moment(message.date).format("MMMM DD, YYYY")}
      </Typography>
    </Paper>
  ) : (
    <div />
  );
};

export default NewDayDivider;
