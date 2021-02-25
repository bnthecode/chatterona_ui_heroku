import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "../../pages/Login";
import Main from "../../pages/Main";
import MobileLanding from "../../pages/MobileLanding";
import { determineMobile } from "../../utilities/global-utilities";
const onMobile = determineMobile();
const PrivateRoute = ({ component: Component, userId, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? (
          <Component {...props} />
        ) : (
          <Redirect to={onMobile ? "/mobile-landing" : "/login"} />
        )
      }
    />
  );
};

const AppRouter = ({ userId }) => {
  return (
    <Router>
      <PrivateRoute path="/" userId={userId} component={Main} />

      <Route exact path="/mobile-landing" component={MobileLanding} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default AppRouter;
