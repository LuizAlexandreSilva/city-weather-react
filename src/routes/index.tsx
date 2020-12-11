import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import CityDetail from '../pages/CityDetail';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/details/:id" component={CityDetail}></Route>
        <Route
          path="*"
          render={() => <Redirect to={{ pathname: '/' }} />}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}
