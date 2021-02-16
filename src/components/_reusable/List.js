import { Divider, List as MuiList, makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import ListItem from "./ListItem";

const useStyles = makeStyles((theme) => ({
  menu: {},
}));

const List = ({ listProps = {}, listItemProps = {} }) => {
  const { listItems, listClass } = listProps;
  const buildListItems = () => {
    return listItems.map((option) => (
      <div>
        <ListItem listItem={option} listItemProps={listItemProps} />
        {option.break && (
          <Divider
            style={{
              height: 1,
              opacity: 0.25,
              width: "100%",
              backgroundColor: "grey",
            }}
          ></Divider>
        )}
      </div>
    ));
  };

  const classes = useStyles();
  return <MuiList className={listClass}>{buildListItems()}</MuiList>;
};

export default List;
