import { createRef, PureComponent } from "react";
import { withStyles } from "@material-ui/styles";

const styles = () => ({
    "@global": {
      "*::-webkit-scrollbar-thumb": {
        display: "none",
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
      "::-webkit-scrollbar-track": {
        display: "none",
      },
      "::-webkit-scrollbar-thumb": {
        display: "none",
      },
      "::-webkit-scrollbar-thumb:hover": {
        display: "none",
      },
    },
    container: {
      maxHeight: "calc(100vh - 160px)",
      padding: 0,
      overflow: "auto",
    },
  });


class InfiniteScroll extends PureComponent {
  state = {
    page: 1,
    limit: 1,
    data: [],
  };
  scrollRef = createRef();

  componentDidUpdate = (prevProps, prevState) => {

    const { data : initialData, updateOnChange: previousUpdater } = prevProps;
    const { updateOnChange: currentUpdater } = this.props;
    const { data: paginatedData } = this.state;
    const { data: previousPaginatedData } = prevState;

  // force update when prop changes..
  // or we dont have any initial data
  if(!previousPaginatedData.length || !paginatedData.length || !initialData.length || previousUpdater !== currentUpdater ) {
    this.setState({ data: this.props.data })
  };



  // we have initial data, but something is going to change
  if(previousPaginatedData.length !== paginatedData.length) {
  }
  };


  componentDidMount = () => {
    const parentElement = document.getElementById("scroll-container");
    if (parentElement) {
    
      parentElement.addEventListener("scroll", this.handleScrolling);
    }
  };
  handleScrolling = async () => {
    const { addMoreHandler } = this.props;
    const { page, limit, data } = this.state;
    const parentElement = document.getElementById("scroll-container");
    if (parentElement.scrollTop === 0) {
        const scrollPostition = parentElement.scrollTop;
      this.setState({ loading: true });
      const addedItems = await addMoreHandler(page, limit);
      this.setState({
        page: page + 1,
        limit: limit + 1,
        scrolling: false,
        data: [...addedItems, ...data],
        // loading: false,
      });
      parentElement.scrollTop = scrollPostition - 90
    }
  };
  render() {
    const { children, IteratingComponent, dataProperty, classes, ...props } = this.props;
    const { data } = this.state;
    return (
      <div className={classes.container} id="scroll-container">
        {/* {this.state.loading ? <div>LOADING</div> : ""} */}
        <IteratingComponent {...{ [dataProperty]: data }} />
        <div style={{ border: "1px solid white" }} ref={this.scrollRef} />
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScroll);