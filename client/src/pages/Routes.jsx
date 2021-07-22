import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "../containers/Home";
import { About } from "../containers/About";
import { Register } from "../containers/Register";
import { ErrorPage } from "../components/ErrorPage";

export const Routes = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route><ErrorPage /></Route>
            </Switch>
        </React.Fragment>
    </BrowserRouter>
);

