import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Header } from "./PageHeader";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const mockStore = configureStore();
const initialState = {
  users: [],
  usersLoaded: 0,
  cachedUsers: [],
  isLoading: false,
  latestError: null,
  filter: null,
  nationalityFilter: ["CH", "ES", "GB", "FR"],
};
const store = mockStore(initialState);

it("renders without crashing default page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
        </Switch>
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing, page = usersGrid", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header page="usersGrid" />
          </Route>
        </Switch>
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing, page = settings", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header page="settings" />
          </Route>
        </Switch>
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("in page = usersGrid mode the search bar is enabled", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header page="usersGrid" />
          </Route>
        </Switch>
      </Router>
    </Provider>,
    div
  );

  const inputs = div.getElementsByTagName("input");
  // Verify there is 1 input tags
  expect(inputs.length).toBe(1);
  // Verify it is a search input field
  expect(inputs[0].getAttribute("type")).toBe("search");
  // Verify it is disabled (page = settings)
  expect(inputs[0].getAttribute("disabled")).toBeNull();
  ReactDOM.unmountComponentAtNode(div);
});

it("in page = usersGrid mode the search bar is disabled", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header page="settings" />
          </Route>
        </Switch>
      </Router>
    </Provider>,
    div
  );

  const inputs = div.getElementsByTagName("input");
  // Verify there is 1 input tags
  expect(inputs.length).toBe(1);
  // Verify it is a search input field
  expect(inputs[0].getAttribute("type")).toBe("search");
  // Verify it is disabled (page = settings)
  expect(inputs[0].getAttribute("disabled")).toBeDefined();
  ReactDOM.unmountComponentAtNode(div);
});
