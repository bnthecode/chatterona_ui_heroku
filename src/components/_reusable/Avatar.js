import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.secondary.main,
    // backgroundSize: '44px 44px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    objectFit: "contain",
    backgroundColor: theme.palette.secondary.dark,
    margin: 6,
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
}));

const getSizes = (type) => {
  switch (type) {
    case "xs":
      return { height: 32, width: 32 };
    case "sm":
      return { height: 36, width: 36 };
    case "md":
      return { height: 42, width: 42 };
    case "lg":
      return { height: 54, width: 54 };
  }
};

const Avatar = ({ backgroundURL, size, ...props }) => {
  const classes = useStyles();
  const { height, width } = getSizes(size);
  return (
    <Paper
      style={{
        backgroundImage: `url(${backgroundURL})`,
        height,
        width,
        borderRadius: height / 2,
      }}
      className={clsx(classes.avatar)}
      {...props}
    />
  );
};

export default Avatar;
