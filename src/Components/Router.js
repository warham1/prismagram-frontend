import React from "react";
import propTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);

const AppRouter = ({ isLoggedIn }) => <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>;

AppRouter.propTypes = {
  isLoggedIn: propTypes.bool.isRequired
};

export default AppRouter;
