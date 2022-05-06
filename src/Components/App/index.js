import React, { useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "../../axios";

import Home from "../../Pages/Home";
import UserProfile from "../../Pages/UserProfile";
import About from "../../Pages/About";
import Login from "../../Pages/Login";
import UserFoods from "../../Pages/UserFoods/index";
import Foods from "../Foods/index";
import FoodDetail from "../FoodDetail/index";
import MyNabvar from "../MyNavbar/index";
import * as ROUTES from "../../constants/routes";
import CategorySettingsPage from "../../Pages/CategorySettingsPage";
import Register from "../../Pages/Register";

const App = () => {
  const history = useHistory();
  const [_token, setToken] = useState(null);
  const [_id, setId] = useState("hhshshhshs");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setToken(null);
    history.push("/");
    console.log("logged out");

    // document.cookie =
    //   "amazon-token=; expires=" +
    //   new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);

    axios
      .get("users/logout")
      .then((result) => history.push("/"))
      .catch((err) => console.log(err));
  };

  const handleLogin = (token, id) => {
    // setToken(token);
    setId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    history.push("/");
  };

  return (
    <BrowserRouter>
      <div>
        <MyNabvar onLogout={handleLogout} />
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.ABOUT} component={About} />
          <Route
            exact
            path={ROUTES.CATEGORYSETTINGS}
            component={CategorySettingsPage}
          />
          <Route exact path={ROUTES.USERFOODS} component={UserFoods} />
          <Route
            exact
            path={ROUTES.LOGIN}
            render={() => <Login onLogin={handleLogin} />}
          />

          <Route path={ROUTES.USERPROFIILE}>
            <UserProfile id={localStorage.getItem("id")} />
          </Route>
          <Route path="/foods/:id" component={FoodDetail} />
          {/* <Route exact path={ROUTES.FOODDETAIL} component={FoodDetail} /> */}
          <Route exact path={ROUTES.FOODS} component={Foods} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
