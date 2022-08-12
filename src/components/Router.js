import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
import SweetUpload from "./SweetUpload";

const AppRouter =  ({ refreshUser,isLoggedIn, userObj }) => {
  return(
  <Router>
    {isLoggedIn && <Navigation userObj={userObj} />}
    <Switch>
      {isLoggedIn ?
        (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile" >
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/sweetFactory">
              <SweetUpload userObj={userObj} />
            </Route>
          </div>
        )
        :
        (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
    </Switch>
  </Router>
  )
}
export default AppRouter;
