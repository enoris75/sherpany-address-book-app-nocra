import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Grid } from "./UsersGrid";
import { NUMBER_OF_COLUMNS } from "../shared/Constants";
import configureStore from "redux-mock-store";
const testUser = {
  email: "isaac.soler@example.com",
  location: {
    city: "Bilbao",
    country: "Spain",
    postcode: 39963,
    state: "Andalucía",
    street: {
      name: "Avenida de Salamanca",
      number: 8039,
    },
  },
  login: {
    uuid: "8e8c2205-0951-4742-9f4c-2e6925f32e8e",
    username: "brownrabbit255",
  },
  name: {
    title: "Mr",
    first: "Isaac",
    last: "Soler",
  },
  picture: {
    large: "https://randomuser.me/api/portraits/men/56.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
  },
  phone: "913-921-958",
  cell: "686-235-580",
};
const mockStore = configureStore();
const initialState = {
  users: [testUser],
  usersLoaded: 0,
  cachedUsers: [],
  isLoading: false,
  latestError: null,
  filter: null,
  nationalityFilter: ["CH", "ES", "GB", "FR"],
};
const store = mockStore(initialState);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Grid />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("each row has a fixed nubmer of elements", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Grid />
    </Provider>,
    div
  );

  const rows = div.getElementsByClassName("row");
  // Verify that there is exactly 1 row (only one user)
  expect(rows.length).toBe(1);
  // Verify that the row has the determined number of columns
  expect(rows[0].children.length).toBe(NUMBER_OF_COLUMNS);

  ReactDOM.unmountComponentAtNode(div);
});
