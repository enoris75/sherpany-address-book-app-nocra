import { loadNextBatch } from "./UserService";
import { store } from "../redux";
import { BATCH_SIZE } from "../shared/Constants";

const testUser1 = {
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
const testUser2 = {
  email: "veronica.sanz@example.com",
  location: {
    city: "Ciudad Real",
    country: "Spain",
    postcode: 69511,
    state: "Castilla la Mancha",
    street: {
      name: "Calle de Ferraz",
      number: 6146,
    },
  },
  login: {
    username: "biggorilla927",
  },
  name: {
    title: "Mrs",
    first: "Veronica",
    last: "Sanz",
  },
  picture: {
    large: "https://randomuser.me/api/portraits/women/78.jpg",
    medium: "https://randomuser.me/api/portraits/med/women/78.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/78.jpg",
  },
  phone: "933-982-717",
  cell: "649-754-201",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [testUser1, testUser2] }),
  })
);

it("load the very first batch", async () => {
  const initialState = store.getState();
  await loadNextBatch();

  const finalState = store.getState();
  expect(finalState.cachedUsers.length).toBeGreaterThan(0);
  expect(finalState.users.length).toBeGreaterThan(initialState.users.length);
  expect(finalState.usersLoaded).toBe(initialState.usersLoaded + BATCH_SIZE);
  expect(finalState.users[0]).toBe(testUser1);
  expect(finalState.cachedUsers[0]).toBe(testUser2);
});

it("load a second batch, users in the cache", async () => {
  const initialState = store.getState();
  const firstCachedUser = initialState.cachedUsers[0];
  const initiallyLoadedUsers = initialState.users.length;
  await loadNextBatch();

  const finalState = store.getState();
  expect(finalState.cachedUsers.length).toBeGreaterThan(0);
  expect(finalState.users.length).toBeGreaterThan(initialState.users.length);
  expect(finalState.usersLoaded).toBe(initialState.usersLoaded + BATCH_SIZE);
  expect(finalState.users[initiallyLoadedUsers]).toBe(firstCachedUser);
  expect(finalState.cachedUsers[0]).toBe(testUser1);
});
