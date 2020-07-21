import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "redux-mock-store";

it("renders without crashing", () => {
  const mockStore = configureStore();
  const initialState = {
    users: [],
    usersLoaded: 0,
    cachedUsers: [],
    isLoading: false,
    latestError: null,
    filter: null,
  };
  const store = mockStore(initialState);

  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
