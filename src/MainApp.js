import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";

export const store = configureStore();

const languages = JSON.parse(localStorage.getItem("languages"));
if (languages) store.dispatch({ type: "LOAD_STORAGE", payload: languages });

const unsub = store.subscribe(() =>
  localStorage.setItem("languages", JSON.stringify(store.getState().languages))
);

const MainApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default MainApp;
