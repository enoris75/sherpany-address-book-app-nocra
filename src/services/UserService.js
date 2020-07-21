// import { store } from "../redux";
import {
  store,
  setIsLoadingOn,
  setIsLoadingOff,
  setLatestError,
  addToCache,
  addFromCache,
} from "../redux";
import {
  BATCH_SIZE,
  SEED,
  RANDOMUSER_ME_BASE_URL,
  CATALOG_SIZE,
} from "../shared/Constants";

/**
 * Load the next batch of users. If some loading is alraedy in progress then
 * the function does nothing.
 */
export async function loadNextBatch() {
  let currentState = store.getState();
  if (currentState.isLoading) {
    // Loading is already in progress, return.
    return;
  }
  let userAlreadyLoaded = currentState.usersLoaded;
  // Note: if no page parameter is passed then randomuser.me sets it by default at 1. Similarily
  // if a value < 1 is passed as page then this is automatically set to 1.
  // For some mysterious reason some people start counting at 1 and then they unknowingly find themselves
  // on the 13th floor of a building while believing to be in the safety of the 14th.
  // Long story short: we need to have pages starting from 1 and then increase
  // otherwise that Mads Sørensen guy will always appear twice (additional note: he's the first result
  // if the seed is "XYZ").
  let currentPage = userAlreadyLoaded / BATCH_SIZE + 1;

  // Verify whether the cache has already a batch of users ready to be put into
  // the global users list.
  let isCacheFull = currentState.cachedUsers.length ? true : false;

  // Verify whether with the users already in the cache we're already covering the size of the catalog
  if (isCacheFull && userAlreadyLoaded + BATCH_SIZE >= CATALOG_SIZE) {
    // Move the users from the cache to the users list
    store.dispatch(addFromCache());
    return;
  }

  // Note: if the cache is empty (e.g. the very first time users are loaded)
  // load twice as many and put the second half in the cache.
  let numberOfResults = isCacheFull ? BATCH_SIZE : 2 * BATCH_SIZE;

  let nationalities = currentState.nationalityFilter.join(",");

  let url = `${RANDOMUSER_ME_BASE_URL}?page=${currentPage}&results=${numberOfResults}&seed=${SEED}&nat=${nationalities}`;

  store.dispatch(setIsLoadingOn("message"));

  if (isCacheFull) {
    // Add the users into the global state user list immediately
    // while additional users are loaded from the server
    store.dispatch(addFromCache());
    let currentState = store.getState();
    console.log(currentState);
  }

  try {
    const response = await fetch(url);
    let json = await response.json();

    if (isCacheFull) {
      // Note: users have already been added to the user list:
      // fill the cache with the just fetched users
      store.dispatch(addToCache(json.results));
    } else {
      // The cache is empty, hence we downloaded twice as many users
      let users = json.results;
      // We should have exactly twice the size of a normal batch, but lets
      // take the size from the results themselves, just to be sure.
      let numberOfResults = users.length;
      let firstHalf = users.slice(0, numberOfResults / 2);
      let secondHalf = users.slice(numberOfResults / 2);
      // Add the first half of results to the cache.
      store.dispatch(addToCache(firstHalf));
      // Move the users from the cache to the users list
      store.dispatch(addFromCache());
      // Add the second half of results to the cache.
      store.dispatch(addToCache(secondHalf));
    }
  } catch (error) {
    store.dispatch(setLatestError(`Error loading users from url: ${url}`));
  } finally {
    store.dispatch(setIsLoadingOff("message"));
  }
}
