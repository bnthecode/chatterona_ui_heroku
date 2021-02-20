import { Divider, List as MuiList } from "@material-ui/core";
import ListItem from "./ListItem";


const List = ({ listProps = {}, listItemProps = {} }) => {
  const { listItems, listClass } = listProps;
  const buildListItems = () => {
    return listItems.map((option, i) => (
      <div key={`${option.name}_${i}`}>
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

  return <MuiList className={listClass}>{buildListItems()}</MuiList>;
};

export default List;
