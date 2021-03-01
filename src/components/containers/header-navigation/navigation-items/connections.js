import { Route, Switch, withRouter } from "react-router";
import ConnectionContentHeader from "../../../main/connections/connection-content-header/ConnectionContentHeader";

const ConnectionsHeader = ({ match, updateHeaderFilter }) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}`}>
          <ConnectionContentHeader updateHeaderFilter={updateHeaderFilter}></ConnectionContentHeader>
        </Route>
        <Route exact path={`${match.url}/store`}>
          <div>Nitro</div>
        </Route>
        <Route exact path={`${match.url}/:id`}>
          <div>this is a chat header</div>
        </Route>
      </Switch>
    </div>
  );
};
export default withRouter(ConnectionsHeader);
