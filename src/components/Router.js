import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MobileLanding from "../pages/MobileLanding";
import UserSettings from "../pages/UserSettings";
import history from "../redux/history";
import { determineMobile } from '../utilities/global-utilities';
const onMobile = determineMobile();
const PrivateRoute = ({ component: Component, userId, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? <Component {...props} /> : <Redirect to={onMobile ? '/mobile-landing' : '/login'} />
      }
    />
  );
};


const AppRouter = ({ userId }) => {
  return (
    <Router history={history}>
    <PrivateRoute exact path="/" userId={userId} component={Main} />
    <PrivateRoute exact path="/settings" userId={userId} component={UserSettings} />
    <Route exact path="/mobile-landing" component={MobileLanding} />
    <Route exact path="/login" component={Login} />
  </Router>
);
};

export default AppRouter;
